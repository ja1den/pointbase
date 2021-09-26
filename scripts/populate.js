// Import
const bcrypt = require('bcrypt');

require('colors');

// Lib
const sequelize = require('../src/lib/sequelize');

const { random, randomInt } = require('../src/lib/random');

// Main
async function main() {
	try {
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
		require('../src/models/associate');

		// Log
		console.log(`\u2728  MySQL ${await sequelize.databaseVersion()}`.green);
		console.log();

		// Sync
		console.log('Syncing database models.'.yellow);
		console.log();

		await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
		await sequelize.sync({ force: true });
		await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

		// Log
		console.log('Populating users.');

		// Create Users
		const users = await sequelize.models.user.bulkCreate([
			{ name: 'User 1', email: 'u1@school.edu.au', password: await bcrypt.hash('admin', 10), elevated: true },
			{ name: 'User 2', email: 'u2@school.edu.au', password: await bcrypt.hash('admin', 10), elevated: false }
		]);

		// Log
		console.log('Populating events.');

		// Create Events
		const events = await sequelize.models.event.bulkCreate([
			{ name: 'Sports Day 2020', active: false },
			{ name: 'Sports Day 2021', active: true },
			{ name: 'Sports Day 2022', active: false }
		]);

		// Log
		console.log('Populating houses.');

		// Create Houses
		const houses = await sequelize.models.house.bulkCreate([
			{ name: 'House 1', colour: '#dc3545', active: true },
			{ name: 'House 2', colour: '#ffc107', active: true },
			{ name: 'House 3', colour: '#198754', active: true },
			{ name: 'House 4', colour: '#0d6efd', active: true }
		]);

		// Log
		console.log('Populating sport_types.');

		// Create Houses
		const sportTypes = await sequelize.models.sportType.bulkCreate([
			{ name: 'House Ranking', description: 'Each house competes as a team, with 1st receiving 5 points, 2nd receiving 4 points, etc.' },
			{ name: 'House Ranking, plus Bonus', description: 'House Ranking, but with the ability to add bonus points.' },
			{ name: 'Student Points', description: 'Each student receives points based on performance.' },
			{ name: 'Placement and Participation', description: '1st receives 5 points, 2nd receives 4 points, and 3rd receives 3 points. Each student receives a point for participation.' }
		]);

		// Log
		console.log('Populating sports.');

		// Create Sports
		const sports = await sequelize.models.sport.bulkCreate([
			{ name: 'Launch Board Relay', sportTypeId: sportTypes[1].id, active: true },
			{ name: 'Bean Bag Toss', sportTypeId: sportTypes[0].id, active: true },
			{ name: 'Sack Race', sportTypeId: sportTypes[0].id, active: false },
			{ name: 'Egg and Spoon', sportTypeId: sportTypes[0].id, active: true },
			{ name: 'Long Run (R-2)', sportTypeId: sportTypes[3].id, active: true },
			{ name: 'Long Jump', sportTypeId: sportTypes[2].id, active: true },
			{ name: 'Shot Put', sportTypeId: sportTypes[2].id, active: true },
			{ name: 'Long Throw', sportTypeId: sportTypes[2].id, active: false },
			{ name: 'High Jump', sportTypeId: sportTypes[2].id, active: true }
		]);

		// Log
		console.log('Populating results.');

		// Date Range
		const dateRange = [new Date('2021-09-17T23:30:00.000Z'), new Date('2021-09-18T02:30:00.000Z')];

		// Iterate Events
		for (const event of events) {
			// House Biases
			const biases = houses.reduce((biases, house) => ({ ...biases, [house.name]: random(0, 1) - 0.5 }), {});

			// Iterate Houses
			for (const house of houses) {
				// Initialise Date
				let date = new Date(dateRange[0]);

				// Generate Records
				let records = [];

				do {
					records.push({
						eventId: event.id,
						sportId: sports[randomInt(0, sports.length)].id,
						houseId: house.id,
						points: Math.round(random(1, 3) + biases[house.name]),
						timestamp: new Date(date),
						userId: users[0].id
					});

					// Increase Date
					date.setSeconds(date.getSeconds() + 15);
				} while (date < dateRange[1]);

				// Create Records
				await sequelize.models.result.bulkCreate(records);
			}
		}

		// Close Connection
		await sequelize.close();
	} catch (e) {
		// Log
		console.error(e);

		// Exit
		process.exit(1);
	}
}
main();
