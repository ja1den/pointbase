// Import
const { DataTypes } = require('sequelize');

// Lib
const sequelize = require('../lib/sequelize');

// Model
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

// Alias
sequelize.models.sportType = sequelize.models.sport_type;

// Export
module.exports = SportType;
