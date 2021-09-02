// Import
const passport = require('passport');
const express = require('express');

// Define Routes
const router = express.Router();

// Check Login
router.get('/', (req, res) => {
	try {
		// Logged in?
		if (req.isAuthenticated()) {
			res.send(req.user);
		} else {
			res.end();
		}
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
});

// Login
router.post('/login', (req, res) => {
	try {
		// Login
		passport.authenticate('local')(req, res, () => res.send(req.user));
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
});

// Logout
router.get('/logout', (req, res) => {
	try {
		// Logout
		req.logout();

		// Respond
		res.end();
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
});

// Export
module.exports = router;
