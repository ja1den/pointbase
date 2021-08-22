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
import Event from './event';
import User from './user';
import Student from './student';
import House from './house';
import Sport from './sport';

// Define Types
interface ClassProperties {
	id: number;
	name: string;
	eventId: number;
	userId: number;
}

interface ClassCreationProperties extends Optional<ClassProperties, 'id'> { }

class Class extends Model<ClassProperties, ClassCreationProperties> implements ClassProperties {
	// Properties
	public id!: number;
	public name!: string;
	public eventId!: number;
	public userId!: number;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Associations
	public getClassSports!: HasManyGetAssociationsMixin<ClassSport>;
	public addClassSport!: HasManyAddAssociationMixin<ClassSport, number>;
	public hasClassSport!: HasManyHasAssociationMixin<ClassSport, number>;
	public countClassSports!: HasManyCountAssociationsMixin;
	public createClassSport!: HasManyCreateAssociationMixin<ClassSport>;

	public getEvent!: BelongsToGetAssociationMixin<Event>;
	public createEvent!: BelongsToCreateAssociationMixin<Event>;

	public getUser!: BelongsToGetAssociationMixin<User>;
	public createUser!: BelongsToCreateAssociationMixin<User>;

	public getStudents!: HasManyGetAssociationsMixin<Student>;
	public addStudent!: HasManyAddAssociationMixin<Student, number>;
	public hasStudent!: HasManyHasAssociationMixin<Student, number>;
	public countStudents!: HasManyCountAssociationsMixin;
	public createStudent!: HasManyCreateAssociationMixin<Student>;

	public getHouses!: BelongsToManyGetAssociationsMixin<House>;
	public addHouse!: BelongsToManyAddAssociationMixin<House, number>;
	public hasHouse!: BelongsToManyHasAssociationMixin<House, number>;
	public countHouses!: BelongsToManyCountAssociationsMixin;
	public createHouse!: BelongsToManyCreateAssociationMixin<House>;

	public getSports!: BelongsToManyGetAssociationsMixin<Sport>;
	public addSport!: BelongsToManyAddAssociationMixin<Sport, number>;
	public hasSport!: BelongsToManyHasAssociationMixin<Sport, number>;
	public countSports!: BelongsToManyCountAssociationsMixin;
	public createSport!: BelongsToManyCreateAssociationMixin<Sport>;

	public readonly classSports?: ClassSport[];
	public readonly event?: Event;
	public readonly user?: User;
	public readonly students?: Student[];
	public readonly houses?: House[];
	public readonly sports?: Sport[];

	public static associations: {
		classSports: Association<Class, ClassSport>;
		event: Association<Class, Event>;
		user: Association<Class, User>;
		students: Association<Class, Student>;
		houses: Association<Class, House>;
		sports: Association<Class, Sport>;
	}
}

// Define Model
Class.init({
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
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize, modelName: 'class', tableName: 'class'
});

// Export
export default Class;
