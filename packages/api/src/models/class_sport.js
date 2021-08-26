// Import
const { DataTypes } = require('sequelize');

// Lib
const sequelize = require('../lib/sequelize');

// Define Model
const ClassSport = sequelize.define('class_sport', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		unique: true,
		autoIncrement: true
	},
	classId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	sportId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, { sequelize });

// Export
module.exports = ClassSport;
