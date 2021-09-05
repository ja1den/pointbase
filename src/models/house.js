// Import
const { DataTypes } = require('sequelize');

// Lib
const sequelize = require('../lib/sequelize');

// Model
const House = sequelize.define('house', {
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
	colour: {
		type: DataTypes.STRING(6),
		allowNull: false
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, { sequelize });

// Export
module.exports = House;
