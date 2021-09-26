// Import
const { Sequelize } = require('sequelize');

// Environment
if (process.env.DB_HOST === undefined) {
	console.error('DB_HOST cannot be undefined.'.red);
	process.exit(1);
}

if (process.env.DB_PORT === undefined) {
	console.error('DB_PORT cannot be undefined.'.red);
	process.exit(1);
}

if (process.env.DB_NAME === undefined) {
	console.error('DB_NAME cannot be undefined.'.red);
	process.exit(1);
}

if (process.env.DB_USER === undefined) {
	console.error('DB_USER cannot be undefined.'.red);
	process.exit(1);
}

if (process.env.DB_PASS === undefined) {
	console.error('DB_PASS cannot be undefined.'.red);
	process.exit(1);
}

// Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',

	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT ?? '3306'),

	define: {
		underscored: true,
		freezeTableName: true,
		timestamps: false
	},
	logging: false
});

// Export
module.exports = sequelize;
