// Import
const ClassSport = require('./class_sport');
const Class = require('./class');
const Event = require('./event');
const House = require('./house');
const Result = require('./result');
const SportType = require('./sport_type');
const Sport = require('./sport');
const Student = require('./student');
const User = require('./user');

// Define Associations
ClassSport.belongsTo(Class, { foreignKey: { name: 'classId' } });
Class.hasMany(ClassSport, { foreignKey: { name: 'classId' } });

ClassSport.belongsTo(Sport, { foreignKey: { name: 'sportId' } });
Sport.hasMany(ClassSport, { foreignKey: { name: 'sportId' } });

Class.belongsTo(Event, { foreignKey: { name: 'eventId' } });
Event.hasMany(Class, { foreignKey: { name: 'eventId' } });

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

Sport.belongsToMany(Student, { through: { model: Result, unique: false }, foreignKey: { name: 'sportId' } });
Student.belongsToMany(Sport, { through: { model: Result, unique: false }, foreignKey: { name: 'studentId' } });
