// Import
const path = require('path');

const express = require('express');
const pug = require('pug');

const { ValidationError } = require('sequelize');

const { parse } = require('node-html-parser');

// Lib
const sequelize = require('../../lib/sequelize');
const auth = require('../../middleware/auth');

const io = require('../../lib/sockets');
const debounce = require('../../lib/debounce');

// Define Routes
const router = express.Router();

// Create
router.post('/', auth, async (req, res) => {
	try {
		// Check Role
		if (!req.isAuthenticated()) return res.status(401).end();

		// Parse Date
		req.body.timestamp = new Date(req.body.timestamp);

		// Set User
		req.body.userId = String(req.user.id);

		// Create
		const { id } = await sequelize.models.result.create(req.body);

		// Respond
		res.status(201).send(id.toString());

		// Socket Update
		socketUpdate(req.body.eventId);
	} catch (e) {
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
		const records = await sequelize.models.result.findAll();

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
		const record = await sequelize.models.result.findByPk(req.params.id);

		// Update Fields
		for (const key of Object.keys(req.body)) record.set(key, req.body[key]);

		// Update
		await record.save();

		// Respond
		res.status(204).end();

		// Socket Update
		socketUpdate(record.eventId);
	} catch (e) {
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

		// Find Record
		const record = await sequelize.models.result.findOne({ where: { id: req.params.id } });

		// Delete
		await record.destroy();

		// Respond
		res.status(204).end();

		// Socket Update
		socketUpdate(record.eventId);
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
});

// Dashboard Page
const dashboardData = require('../pages/dashboard');
const dashboardPage = pug.compileFile(path.resolve(__dirname, '../../..', 'views', 'dashboard.pug'));

// Socket Update
const socketUpdate = debounce(async eventId => {
	// Page Data
	const data = await new Promise(
		(resolve, reject) =>
			dashboardData({ query: { event: eventId } }, { render: (_, data) => resolve(data) }).catch(reject)
	);

	// Render Page
	const page = parse(dashboardPage({ current_url: '/dashboard?event' + eventId, ...data }));

	// Update Data
	const update = [eventId];

	// Cards
	update.push(page.querySelector('#cards').toString());

	// Chart Data
	const script = page.querySelector('script:nth-last-of-type(2)').toString();

	const match = script.match(/(?<=JSON\.parse\(').+(?='\))/g);

	update.push(...match.map(match => JSON.parse(match)));

	// Table
	update.push(page.querySelector('table').toString());

	// Emit Update
	io.emit('update', update);
}, 100);

// Export
module.exports = router;
