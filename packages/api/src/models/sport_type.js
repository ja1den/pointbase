// Import
const { DataTypes } = require('sequelize');

// Lib
const sequelize = require('../lib/sequelize');

// Define Model
const SportType = sequelize.define('sport_type', {
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
	description: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, { sequelize });

// Export
module.exports = SportType;
