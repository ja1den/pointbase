// Import
const seedrandom = require('seedrandom');

// Seed
const rnd = seedrandom(42);

// Random
exports.random = (min, max) => rnd() * (max - min) + min;

// Random Integer
exports.randomInt = (min, max) => Math.floor(exports.random(min, max));
