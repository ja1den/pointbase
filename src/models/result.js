// Import
const { DataTypes } = require('sequelize');

// Lib
const sequelize = require('../lib/sequelize');

// Model
const Result = sequelize.define('result', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		unique: true,
		autoIncrement: true
	},
	eventId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	sportId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	houseId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	points: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, { sequelize });

// Export
module.exports = Result;
