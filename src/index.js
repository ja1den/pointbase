// Import
const minimist = require('minimist');
const path = require('path');

const express = require('express');
const session = require('express-session');

const SessionStore = require('express-mysql-session');

const { Server } = require('socket.io');

require('colors');

// Lib
const sequelize = require('./lib/sequelize');
const passport = require('./lib/passport');

// Main
async function main() {
	// Log
	const startTime = Date.now();

	// Read Port
	const args = minimist(process.argv.slice(2), { alias: { p: 'port' } });

	const port = typeof args.port === 'number'
		? args.port
		: 3000;

	// Sequelize
	try {
		await sequelize.authenticate();
	} catch (e) {
		// Log
		console.error('Sequelize connection failed!'.red);
		console.error(e);

		// Exit
		process.exit(1);
	}

	// Load Models
	require('./models/associate');

	// Sync
	if (args.sync === true) {
		console.log('Syncing database models.'.yellow);
		console.log();

		await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
		await sequelize.sync({ force: true });
		await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
	}

	// Express
	const app = express().use(express.json());

	// HTTP
	const http = require('http').createServer(app);

	// Sockets
	require('./lib/sockets')(new Server(http));

	// Session
	const connection = (await sequelize.connectionManager.getConnection()).promise();

	app.use(session({
		secret: 'pointbase',
		store: new SessionStore({ schema: { tableName: 'session', columnNames: { session_id: 'id' } } }, connection),
		resave: false,
		saveUninitialized: false
	}));

	// Passport
	app.use(passport.initialize());
	app.use(passport.session());

	// Pug
	app.use((req, res, next) => {
		res.locals.current_url = req.url;
		next();
	});

	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());

	app.set('view engine', 'pug');

	// Load Routes
	app.use(require('./controllers'));

	// Public Files
	app.use(express.static(path.resolve(__dirname, '..', 'public')));

	// 404
	app.use('/api', (_req, res) => res.status(404).end());
	app.use((_req, res) => res.redirect('/'));

	// Listen
	http.listen(port, () => {
		console.log('Server running at', ('http://localhost:' + port).cyan);
		console.log(`\u2728  Up in ${Date.now() - startTime}ms.`.green);
	});

	// Handle Exit
	['SIGINT', 'SIGTERM', 'SIGUSR2'].map(signal => process.addListener(signal, () => process.exit()));
}
main();
