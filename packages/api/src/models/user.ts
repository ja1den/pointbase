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
import Event from './event';

// Define Types
interface UserProperties {
	id: number;
	name: string;
	email: string;
	password: string;
	admin: boolean;
}

interface UserCreationProperties extends Optional<UserProperties, 'id'> { }

class User extends Model<UserProperties, UserCreationProperties> implements UserProperties {
	// Properties
	public id!: number;
	public name!: string;
	public email!: string;
	public password!: string;
	public admin!: boolean;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Associations
	public getClasses!: HasManyGetAssociationsMixin<Class>;
	public addClass!: HasManyAddAssociationMixin<Class, number>;
	public hasClass!: HasManyHasAssociationMixin<Class, number>;
	public countClasses!: HasManyCountAssociationsMixin;
	public createClass!: HasManyCreateAssociationMixin<Class>;

	public getEvents!: BelongsToManyGetAssociationsMixin<Event>;
	public addEvent!: BelongsToManyAddAssociationMixin<Event, number>;
	public hasEvent!: BelongsToManyHasAssociationMixin<Event, number>;
	public countEvents!: BelongsToManyCountAssociationsMixin;
	public createEvent!: BelongsToManyCreateAssociationMixin<Event>;

	public readonly classes?: Class[];
	public readonly events?: Event[];

	public static associations: {
		classes: Association<User, Class>;
		events: Association<User, Event>;
	}
}

// Define Model
User.init({
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
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			is: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	admin: {
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
}, {
	sequelize, modelName: 'user', tableName: 'user'
});

// Export
export default User;
