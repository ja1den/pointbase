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
	const time = Date.now();

	// Read Port
	const args = minimist(process.argv.slice(2), { alias: { p: 'port' } });

	const port = typeof args.port === 'number'
		? args.port
		: 3000;

	// Sequelize
	try {
		await sequelize.authenticate();
	} catch (e) {
		console.error('Sequelize connection failed!'.red, e);
		return;
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

	// Load Routes
	app.use('/api', require('./controllers'));

	// React
	app.use(express.static(path.resolve(__dirname, '..', '..', 'client')));

	// 404
	app.use((_req, res) => res.status(404).end());

	// Listen
	app.listen(port, () => {
		console.log('Server running at', ('http://localhost:' + port).cyan);
		console.log(`\u2728  Up in ${Date.now() - time}ms.`.green);
	});

	// Handle Exit
	['SIGINT', 'SIGTERM', 'SIGUSR2'].map(signal => process.addListener(signal, () => process.exit()));
}
main();
