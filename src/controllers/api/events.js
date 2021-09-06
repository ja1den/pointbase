// Import
const express = require('express');
const bcrypt = require('bcrypt');

const { ValidationError } = require('sequelize');

// Lib
const sequelize = require('../../lib/sequelize');
const auth = require('../../middleware/auth');

// Define Routes
const router = express.Router();

// Create
router.post('/', auth, async (req, res) => {
	try {
		// Check Role
		if (!req.user.elevated) return res.status(401).end();

		// Create
		const { id } = await sequelize.models.event.create({ ...req.body });

		// Respond
		res.status(201).send(id.toString());
	} catch (e) {
		// Duplicate Record
		if (e.parent.code === 'ER_DUP_ENTRY') return res.status(409).end();

		// Validation
		if (e instanceof ValidationError) return res.status(400).end();

		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
});

// Read
router.get('/', auth, async (_req, res) => {
	try {
		// Find All
		const records = await sequelize.models.event.findAll();

		// Respond
		res.send(records);
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
});

// Update
router.patch('/:id', auth, async (req, res) => {
	try {
		// Check Role
		if (!req.user.elevated) return res.status(401).end();

		// Read Record
		const record = await sequelize.models.event.findByPk(req.params.id);

		// Update Fields
		for (const key of Object.keys(req.body)) record[key] = req.body[key];

		// Update
		await record.save();

		// Respond
		res.status(204).end();
	} catch (e) {
		// Duplicate Record
		if (e.parent.code === 'ER_DUP_ENTRY') return res.status(409).end();

		// Validation
		if (e instanceof ValidationError) return res.status(400).end();

		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
});

// Delete
router.delete('/:id', auth, async (req, res) => {
	try {
		// Elevated
		if (!req.user.elevated) return res.status(401).end();

		// Delete
		await sequelize.models.event.destroy({ where: { id: req.params.id } });

		// Respond
		res.status(204).end();
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
});

// Export
module.exports = router;
