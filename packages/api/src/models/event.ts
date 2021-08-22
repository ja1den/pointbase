// Import
import { Model, DataTypes, Optional, Association } from 'sequelize';

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
import Class from './class';
import House from './house';
import Sport from './sport';
import SportType from './sport_type';
import User from './user';

// Define Types
interface EventProperties {
	id: number;
	name: string;
	active: boolean;
}

interface EventCreationProperties extends Optional<EventProperties, 'id'> { }

class Event extends Model<EventProperties, EventCreationProperties> implements EventProperties {
	// Properties
	public id!: number;
	public name!: string;
	public active!: boolean;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Associations
	public getClasses!: HasManyGetAssociationsMixin<Class>;
	public addClass!: HasManyAddAssociationMixin<Class, number>;
	public hasClass!: HasManyHasAssociationMixin<Class, number>;
	public countClasses!: HasManyCountAssociationsMixin;
	public createClass!: HasManyCreateAssociationMixin<Class>;

	public getHouses!: HasManyGetAssociationsMixin<House>;
	public addHouse!: HasManyAddAssociationMixin<House, number>;
	public hasHouse!: HasManyHasAssociationMixin<House, number>;
	public countHouses!: HasManyCountAssociationsMixin;
	public createHouse!: HasManyCreateAssociationMixin<House>;

	public getSports!: HasManyGetAssociationsMixin<Sport>;
	public addSport!: HasManyAddAssociationMixin<Sport, number>;
	public hasSport!: HasManyHasAssociationMixin<Sport, number>;
	public countSports!: HasManyCountAssociationsMixin;
	public createSport!: HasManyCreateAssociationMixin<Sport>;

	public getSportTypes!: BelongsToManyGetAssociationsMixin<SportType>;
	public addSportType!: BelongsToManyAddAssociationMixin<SportType, number>;
	public hasSportType!: BelongsToManyHasAssociationMixin<SportType, number>;
	public countSportTypes!: BelongsToManyCountAssociationsMixin;
	public createSportType!: BelongsToManyCreateAssociationMixin<SportType>;

	public getUsers!: BelongsToManyGetAssociationsMixin<User>;
	public addUser!: BelongsToManyAddAssociationMixin<User, number>;
	public hasUser!: BelongsToManyHasAssociationMixin<User, number>;
	public countUsers!: BelongsToManyCountAssociationsMixin;
	public createUser!: BelongsToManyCreateAssociationMixin<User>;

	public readonly classes?: Class[];
	public readonly houses?: House;
	public readonly sports?: Sport;
	public readonly sportTypes?: SportType[];
	public readonly users?: User[];

	public static associations: {
		classes: Association<Event, Class>;
		houses: Association<Event, House>;
		sports: Association<Event, Sport>;
		sportTypes: Association<Event, SportType>;
		users: Association<Event, User>;
	}
}

// Define Model
Event.init({
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
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, {
	sequelize, modelName: 'event', tableName: 'event'
});

// Export
export default Event;
