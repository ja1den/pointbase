// Import
const sequelize = require('../../lib/sequelize');

// Page Size
const size = 10;

// Export Route
module.exports = async (req, res) => {
	try {
		// Require Login
		if (!req.isAuthenticated()) return res.redirect('/');

		// Read Records
		let records = await sequelize.models.result.findAll();

		// Total Pages
		const pages = Math.max(Math.ceil(records.length / size), 1);

		// Requested Page
		const page = parseFloat(req.query.page);

		// Check Page
		if (isNaN(page)) return res.redirect('?page=1');

		if (!Number.isInteger(page)) return res.redirect('?page=' + parseInt(page));

		if (page < 1) return res.redirect('?page=1');

		if (pages < page) return res.redirect('?page=' + pages);

		// Slice
		records = records.slice((page - 1) * size, page * size);

		// Read Events
		const events = await sequelize.models.event.findAll();

		// Read Houses
		const houses = await sequelize.models.house.findAll();

		// Read Sports
		const sports = await sequelize.models.sport.findAll();

		// Read Users
		const users = await sequelize.models.user.findAll();

		// Render HTML
		res.render('results', { user: req.user, records, events, houses, sports, users, page, pages });
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
}
