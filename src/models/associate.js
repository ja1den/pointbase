// Import
const Event = require('./event');
const House = require('./house');
const Result = require('./result');
const SportType = require('./sport_type');
const Sport = require('./sport');
const User = require('./user');

// Associations
Result.belongsTo(House, { onDelete: 'cascade' });
House.hasMany(Result, { onDelete: 'cascade' });

Result.belongsTo(Event, { onDelete: 'cascade' });
Event.hasMany(Result, { onDelete: 'cascade' });

Result.belongsTo(User, { onDelete: 'cascade' });
User.hasMany(Result, { onDelete: 'cascade' });

Sport.belongsTo(SportType, { onDelete: 'cascade' });
SportType.hasMany(Sport, { onDelete: 'cascade' });

Result.belongsTo(Sport, { onDelete: 'cascade' });
Sport.hasMany(Result, { onDelete: 'cascade' });
