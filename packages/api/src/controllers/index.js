// Import
const express = require('express');

// Define Routes
const router = express.Router();

router.use('/auth', require('./auth'));

// 404
router.use((_req, res) => res.status.end(404));

// Export
module.exports = router;
