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

// Model
import Event from './event';
import Student from './student';
import Class from './class';

// Define Types
interface HouseProperties {
	id: number;
	name: string;
	colour: string;
	eventId: number;
}

interface HouseCreationProperties extends Optional<HouseProperties, 'id'> { }

class House extends Model<HouseProperties, HouseCreationProperties> implements HouseProperties {
	// Properties
	public id!: number;
	public name!: string;
	public colour!: string;
	public eventId!: number;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Associations
	public getEvent!: BelongsToGetAssociationMixin<Event>;
	public createEvent!: BelongsToCreateAssociationMixin<Event>;

	public getStudents!: HasManyGetAssociationsMixin<Student>;
	public addStudent!: HasManyAddAssociationMixin<Student, number>;
	public hasStudent!: HasManyHasAssociationMixin<Student, number>;
	public countStudents!: HasManyCountAssociationsMixin;
	public createStudent!: HasManyCreateAssociationMixin<Student>;

	public getClasses!: BelongsToManyGetAssociationsMixin<Class>;
	public addClass!: BelongsToManyAddAssociationMixin<Class, number>;
	public hasClass!: BelongsToManyHasAssociationMixin<Class, number>;
	public countClasses!: BelongsToManyCountAssociationsMixin;
	public createClass!: BelongsToManyCreateAssociationMixin<Class>;

	public readonly event?: Event;
	public readonly students?: Student[];
	public readonly classes?: Class[];

	public static associations: {
		event: Association<House, Event>;
		students: Association<House, Student>;
		classes: Association<House, Class>;
	}
}

// Define Model
House.init({
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
	eventId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize, modelName: 'house', tableName: 'house'
});

// Export
export default House;
