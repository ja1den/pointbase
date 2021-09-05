// Import
const Event = require('./event');
const House = require('./house');
const Result = require('./result');
const SportType = require('./sport_type');
const Sport = require('./sport');
const User = require('./user');

// Associations
Result.belongsTo(House);
House.hasMany(Result);

Result.belongsTo(Event);
Event.hasMany(Result);

Result.belongsTo(User);
User.hasMany(Result);

Sport.belongsTo(SportType);
SportType.hasMany(Sport);

Result.belongsTo(Sport);
Sport.hasMany(Result);
