// Import
const { DataTypes } = require('sequelize');

// Lib
const sequelize = require('../lib/sequelize');

// Model
const Sport = sequelize.define('sport', {
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
	sportTypeId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, { sequelize });

// Export
module.exports = Sport;
