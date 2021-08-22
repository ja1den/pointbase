// Import
import { Model, DataTypes, Optional, Association } from 'sequelize';
import {
	BelongsToGetAssociationMixin,
	BelongsToCreateAssociationMixin
} from 'sequelize';

// Lib
import sequelize from '../lib/sequelize';

// Models
import Class from './class';
import Sport from './sport';

// Define Types
interface ClassSportProperties {
	id: number;
	classId: number;
	sportId: number;
}

interface ClassSportCreationProperties extends Optional<ClassSportProperties, 'id'> { }

class ClassSport extends Model<ClassSportProperties, ClassSportCreationProperties> implements ClassSportProperties {
	// Properties
	public id!: number;
	public classId!: number;
	public sportId!: number;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	// Associations
	public getClass!: BelongsToGetAssociationMixin<Class>;
	public createClass!: BelongsToCreateAssociationMixin<Class>;

	public getSport!: BelongsToGetAssociationMixin<Sport>;
	public createSport!: BelongsToCreateAssociationMixin<Sport>;

	public readonly class?: Class;
	public readonly sport?: Sport;

	public static associations: {
		class: Association<ClassSport, Class>;
		sport: Association<ClassSport, Sport>;
	}
}

// Define Model
ClassSport.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		unique: true,
		autoIncrement: true
	},
	classId: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	sportId: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
}, {
	sequelize, modelName: 'classSport', tableName: 'class_sport'
});

// Export
export default ClassSport;
