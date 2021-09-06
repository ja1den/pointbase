// Import
const express = require('express');

// Router
const router = express.Router();

// Routes
router.use('/api/auth', require('./api/auth'));
router.use('/api/events', require('./api/events'));
router.use('/api/houses', require('./api/houses'));
router.use('/api/users', require('./api/users'));

router.get('/dashboard', require('./pages/dashboard'));
router.get('/events', require('./pages/events'));
router.get('/houses', require('./pages/houses'));
router.get('/settings', require('./pages/settings'));

router.get('/', (_req, res) => res.redirect('/dashboard'));

// Export
module.exports = router;
