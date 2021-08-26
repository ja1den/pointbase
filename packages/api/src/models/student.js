// Import
const { DataTypes } = require('sequelize');

// Lib
const sequelize = require('../lib/sequelize');

// Define Model
const Student = sequelize.define('student', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		unique: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	classId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	houseId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, { sequelize });

// Export
module.exports = Student;
