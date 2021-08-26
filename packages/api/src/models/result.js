// Import
const { DataTypes } = require('sequelize');

// Lib
const sequelize = require('../lib/sequelize');

// Define Model
const Result = sequelize.define('result', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		unique: true,
		autoIncrement: true
	},
	sportId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	studentId: {
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
