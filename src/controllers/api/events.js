// Import
const express = require('express');

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

		// Begin Transaction
		const transaction = await sequelize.transaction();

		// Active?
		if (req.body.active) {
			// Read Events
			const events = await sequelize.models.event.findAll({ where: { active: true } }, { transaction });

			// Reset Events
			for (const event of events) await event.set('active', false).save({ transaction });
		}

		// Create
		const { id } = await sequelize.models.event.create(req.body, { transaction });

		// Commit
		await transaction.commit();

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

		// Begin Transaction
		const transaction = await sequelize.transaction();

		// Read Record
		const record = await sequelize.models.event.findByPk(req.params.id, { transaction });

		// Active?
		if (req.body.active) {
			// Read Events
			const events = await sequelize.models.event.findAll({ where: { active: true } }, { transaction });

			// Reset Events
			for (const event of events) await event.set('active', false).save();
		}

		// Update Fields
		for (const key of Object.keys(req.body)) record.set(key, req.body[key]);

		// Update
		await record.save({ transaction });

		// Commit
		await transaction.commit();

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
