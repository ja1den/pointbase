// Import
import { Model, DataTypes, Optional, Association } from 'sequelize';

import {
	BelongsToGetAssociationMixin,
	BelongsToCreateAssociationMixin
} from 'sequelize';
import {
	HasManyGetAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyHasAssociationMixin,
	HasManyCountAssociationsMixin,
	HasManyCreateAssociationMixin
} from 'sequelize';
import {
	BelongsToManyGetAssociationsMixin,
	BelongsToManyAddAssociationMixin,
	BelongsToManyHasAssociationMixin,
	BelongsToManyCountAssociationsMixin,
	BelongsToManyCreateAssociationMixin
} from 'sequelize';

// Lib
import sequelize from '../lib/sequelize';

// Models
import Result from './result';
import Class from './class';
import House from './house';
import Sport from './sport';

// Define Types
interface StudentProperties {
	id: number;
	name: string;
	classId: number;
	houseId: number;
}

interface StudentCreationProperties extends Optional<StudentProperties, 'id'> { }

class Student extends Model<StudentProperties, StudentCreationProperties> implements StudentProperties {
	// Properties
	public id!: number;
	public name!: string;
	public classId!: number;
	public houseId!: number;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Associations
	public getResults!: HasManyGetAssociationsMixin<Result>;
	public addResult!: HasManyAddAssociationMixin<Result, number>;
	public hasResult!: HasManyHasAssociationMixin<Result, number>;
	public countResults!: HasManyCountAssociationsMixin;
	public createResult!: HasManyCreateAssociationMixin<Result>;

	public getClass!: BelongsToGetAssociationMixin<Class>;
	public createClass!: BelongsToCreateAssociationMixin<Class>;

	public getHouse!: BelongsToGetAssociationMixin<House>;
	public createHouse!: BelongsToCreateAssociationMixin<House>;

	public getSports!: BelongsToManyGetAssociationsMixin<Sport>;
	public addSport!: BelongsToManyAddAssociationMixin<Sport, number>;
	public hasSport!: BelongsToManyHasAssociationMixin<Sport, number>;
	public countSports!: BelongsToManyCountAssociationsMixin;
	public createSport!: BelongsToManyCreateAssociationMixin<Sport>;

	public readonly results?: Result[];
	public readonly class?: Class;
	public readonly house?: House;
	public readonly sports?: Sport[];

	public static associations: {
		results: Association<Student, Result>;
		class: Association<Student, Class>;
		house: Association<Student, House>;
		sports: Association<Student, Sport>;
	}
}

// Define Model
Student.init({
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
}, {
	sequelize, modelName: 'student', tableName: 'student'
});

// Export
export default Student;
