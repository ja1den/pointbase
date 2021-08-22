// Import
import ClassSport from './class_sport';
import Class from './class';
import Event from './event';
import House from './house';
import Result from './result';
import SportType from './sport_type';
import Sport from './sport';
import Student from './student';
import User from './user';

// Define Associations
ClassSport.belongsTo(Class, { foreignKey: { name: 'classId' } });
Class.hasMany(ClassSport, { foreignKey: { name: 'classId' } });

ClassSport.belongsTo(Sport, { foreignKey: { name: 'sportId' } });
Sport.hasMany(ClassSport, { foreignKey: { name: 'sportId' } });

Class.belongsTo(Event, { foreignKey: { name: 'eventId' } });
Event.hasMany(Class, { foreignKey: { name: 'eventId' } });

Class.belongsTo(User, { foreignKey: { name: 'userId' } });
User.hasMany(Class, { foreignKey: { name: 'userId' } });

House.belongsTo(Event, { foreignKey: { name: 'eventId' } });
Event.hasMany(House, { foreignKey: { name: 'eventId' } });

Result.belongsTo(Sport, { foreignKey: { name: 'sportId' } });
Sport.hasMany(Result, { foreignKey: { name: 'sportId' } });

Result.belongsTo(Student, { foreignKey: { name: 'studentId' } });
Student.hasMany(Result, { foreignKey: { name: 'studentId' } });

Sport.belongsTo(Event, { foreignKey: { name: 'eventId' } });
Event.hasMany(Sport, { foreignKey: { name: 'eventId' } });

Sport.belongsTo(SportType, { foreignKey: { name: 'sportTypeId' } });
SportType.hasMany(Sport, { foreignKey: { name: 'sportTypeId' } });

Student.belongsTo(Class, { foreignKey: { name: 'classId' } });
Class.hasMany(Student, { foreignKey: { name: 'classId' } });

Student.belongsTo(House, { foreignKey: { name: 'houseId' } });
House.hasMany(Student, { foreignKey: { name: 'houseId' } });

Class.belongsToMany(House, { through: { model: Student, unique: false }, foreignKey: { name: 'classId' } });
House.belongsToMany(Class, { through: { model: Student, unique: false }, foreignKey: { name: 'houseId' } });

Class.belongsToMany(Sport, { through: { model: ClassSport, unique: false }, foreignKey: { name: 'classId' } });
Sport.belongsToMany(Class, { through: { model: ClassSport, unique: false }, foreignKey: { name: 'sportId' } });

Event.belongsToMany(SportType, { through: { model: Sport, unique: false }, foreignKey: { name: 'eventId' } });
SportType.belongsToMany(Event, { through: { model: Sport, unique: false }, foreignKey: { name: 'sportTypeId' } });

Event.belongsToMany(User, { through: { model: Class, unique: false }, foreignKey: { name: 'eventId' } });
User.belongsToMany(Event, { through: { model: Class, unique: false }, foreignKey: { name: 'userId' } });

Sport.belongsToMany(Student, { through: { model: Result, unique: false }, foreignKey: { name: 'sportId' } });
Student.belongsToMany(Sport, { through: { model: Result, unique: false }, foreignKey: { name: 'studentId' } });
