// Import
import { Model, DataTypes, Optional, Association } from 'sequelize';

import {
	BelongsToGetAssociationMixin,
	BelongsToCreateAssociationMixin
} from 'sequelize';

// Lib
import sequelize from '../lib/sequelize';

// Models
import Sport from './sport';
import Student from './student';

// Define Types
interface ResultProperties {
	id: number;
	sportId: number;
	studentId: number;
	points: number;
}

interface ResultCreationProperties extends Optional<ResultProperties, 'id'> { }

class Result extends Model<ResultProperties, ResultCreationProperties> implements ResultProperties {
	// Properties
	public id!: number;
	public sportId!: number;
	public studentId!: number;
	public points!: number;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Associations
	public getSport!: BelongsToGetAssociationMixin<Sport>;
	public createSport!: BelongsToCreateAssociationMixin<Sport>;

	public getStudent!: BelongsToGetAssociationMixin<Student>;
	public createStudent!: BelongsToCreateAssociationMixin<Student>;

	public readonly sport?: Sport;
	public readonly student?: Student;

	public static associations: {
		sport: Association<Result, Sport>;
		student: Association<Result, Student>;
	}
}

// Define Model
Result.init({
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
}, {
	sequelize, modelName: 'result', tableName: 'result'
});

// Export
export default Result;
