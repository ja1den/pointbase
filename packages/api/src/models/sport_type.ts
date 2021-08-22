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
import Sport from './sport';
import Event from './event';

// Define Types
interface SportTypeProperties {
	id: number;
	name: string;
	description: string;
}

interface SportTypeCreationProperties extends Optional<SportTypeProperties, 'id'> { }

class SportType extends Model<SportTypeProperties, SportTypeCreationProperties> implements SportTypeProperties {
	// Properties
	public id!: number;
	public name!: string;
	public description!: string;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Associations
	public getSports!: HasManyGetAssociationsMixin<Sport>;
	public addSport!: HasManyAddAssociationMixin<Sport, number>;
	public hasSport!: HasManyHasAssociationMixin<Sport, number>;
	public countSports!: HasManyCountAssociationsMixin;
	public createSport!: HasManyCreateAssociationMixin<Sport>;

	public getEvents!: BelongsToManyGetAssociationsMixin<Event>;
	public addEvent!: BelongsToManyAddAssociationMixin<Event, number>;
	public hasEvent!: BelongsToManyHasAssociationMixin<Event, number>;
	public countEvents!: BelongsToManyCountAssociationsMixin;
	public createEvent!: BelongsToManyCreateAssociationMixin<Event>;

	public readonly sports?: Sport[];
	public readonly events?: Event[];

	public static associations: {
		sports: Association<SportType, Sport>;
		events: Association<SportType, Event>;
	}
}

// Define Model
SportType.init({
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
}, {
	sequelize, modelName: 'sportType', tableName: 'sport_type'
});

// Export
export default SportType;
