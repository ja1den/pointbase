// Import
const express = require('express');

// Router
const router = express.Router();

// Routes
router.use('/api/auth', require('./api/auth'));
router.use('/api/users', require('./api/users'))

router.get('/settings', require('./pages/settings'));
router.get('/', require('./pages/dashboard'));

// Export
module.exports = router;
