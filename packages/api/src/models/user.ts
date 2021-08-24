// Import
import { Model, DataTypes, Optional, Association } from 'sequelize';

// Lib
import sequelize from '../lib/sequelize';

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
