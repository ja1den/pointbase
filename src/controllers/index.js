// Import
const express = require('express');

// Router
const router = express.Router();

// API
router.use('/api/auth', require('./auth'));

router.use('/api', (_req, res) => res.status.end(404));

// Pages
router.get('/', require('./pages/dashboard'));

router.get('*', require('./pages/error'));

// Export
module.exports = router;
