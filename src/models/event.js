// Import
const { DataTypes } = require('sequelize');

// Lib
const sequelize = require('../lib/sequelize');

// Model
const Event = sequelize.define('event', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		unique: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, { sequelize });

// Export
module.exports = Event;
