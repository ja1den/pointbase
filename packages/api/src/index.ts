// Import
import path from 'path';

import minimist from 'minimist';
import express from 'express';

import 'colors';

// Lib
import sequelize from './lib/sequelize';
import getPaths from './lib/getPaths';

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

	// Load Routes
	const routes: string[] = getPaths(path.resolve(__dirname, 'routes'));

	for (const route of routes) {
		// Route Name
		let name = route.match(/routes(?<name>\/.+)\..+/)?.groups?.name!;

		// Index Route
		if (name.endsWith('index')) {
			name = name.match(/(.+)\/index/)?.[1] ?? '';
		}

		// Route Parameters
		const params = name.match(/\[.+?\]/g);

		if (params !== null) {
			for (const param of params) {
				name = name.replace(param, ':' + param.match(/[^\[\]]+/));
			}
		}

		// Import Method
		const { default: method } = await import(route);

		if (typeof method !== 'function') continue;

		// Bind Route
		app.all('/api' + name, method);
	}

	app.use('/api', (_req, res) => res.status(404).end());

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
	for (const signal of ['SIGINT', 'SIGTERM', 'SIGUSR2'] as NodeJS.Signals[]) {
		process.addListener(signal, () => process.exit());
	}
}
main();
