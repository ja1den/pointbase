// Import
const minimist = require('minimist');
const path = require('path');

const express = require('express');
const session = require('express-session');

const SessionStore = require('express-mysql-session');

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
		console.log('Syncing the database.'.yellow);
		console.log();

		sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
		sequelize.sync({ force: true });
		sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
	}

	// Express
	const app = express().use(express.json());

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

	// Listen
	app.listen(port, () => {
		console.log('Server running at', ('http://localhost:' + port).cyan);
		console.log(`\u2728  Up in ${Date.now() - startTime}ms.`.green);
	});

	// Handle Exit
	['SIGINT', 'SIGTERM', 'SIGUSR2'].map(signal => process.addListener(signal, () => process.exit()));
}
main();
