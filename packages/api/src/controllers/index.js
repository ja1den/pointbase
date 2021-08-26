// Import
const express = require('express');

// Define Routes
const router = express.Router();

router.use('/auth', require('./auth'));

// Export
module.exports = router;
