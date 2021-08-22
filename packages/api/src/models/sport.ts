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
import ClassSport from './class_sport';
import Result from './result';
import Event from './event';
import SportType from './sport_type';
import Class from './class';
import Student from './student';

// Define Types
interface SportProperties {
	id: number;
	name: string;
	eventId: number;
	sportTypeId: number;
}

interface SportCreationProperties extends Optional<SportProperties, 'id'> { }

class Sport extends Model<SportProperties, SportCreationProperties> implements SportProperties {
	// Properties
	public id!: number;
	public name!: string;
	public eventId!: number;
	public sportTypeId!: number;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Associations
	public getClassSports!: HasManyGetAssociationsMixin<ClassSport>;
	public addClassSport!: HasManyAddAssociationMixin<ClassSport, number>;
	public hasClassSport!: HasManyHasAssociationMixin<ClassSport, number>;
	public countClassSports!: HasManyCountAssociationsMixin;
	public createClassSport!: HasManyCreateAssociationMixin<ClassSport>;

	public getResults!: HasManyGetAssociationsMixin<Result>;
	public addResult!: HasManyAddAssociationMixin<Result, number>;
	public hasResult!: HasManyHasAssociationMixin<Result, number>;
	public countResults!: HasManyCountAssociationsMixin;
	public createResult!: HasManyCreateAssociationMixin<Result>;

	public getEvent!: BelongsToGetAssociationMixin<Event>;
	public createEvent!: BelongsToCreateAssociationMixin<Event>;

	public getSportType!: BelongsToGetAssociationMixin<SportType>;
	public createSportType!: BelongsToCreateAssociationMixin<SportType>;

	public getClasses!: BelongsToManyGetAssociationsMixin<Class>;
	public addClass!: BelongsToManyAddAssociationMixin<Class, number>;
	public hasClass!: BelongsToManyHasAssociationMixin<Class, number>;
	public countClasses!: BelongsToManyCountAssociationsMixin;
	public createClass!: BelongsToManyCreateAssociationMixin<Class>;

	public getStudents!: BelongsToManyGetAssociationsMixin<Student>;
	public addStudent!: BelongsToManyAddAssociationMixin<Student, number>;
	public hasStudent!: BelongsToManyHasAssociationMixin<Student, number>;
	public countStudents!: BelongsToManyCountAssociationsMixin;
	public createStudent!: BelongsToManyCreateAssociationMixin<Student>;

	public readonly classSports?: ClassSport[];
	public readonly results?: Result[];
	public readonly event?: Event;
	public readonly sportType?: SportType;
	public readonly classes?: Class[];
	public readonly students?: Student[];

	public static associations: {
		classSports: Association<Sport, ClassSport>;
		results: Association<Sport, Result>;
		event: Association<Sport, Event>;
		sportType: Association<Sport, SportType>;
		classes: Association<Sport, Class>;
		students: Association<Sport, Student>;
	}
}

// Define Model
Sport.init({
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
	eventId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	sportTypeId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize, modelName: 'sport', tableName: 'sport'
});

// Export
export default Sport;
