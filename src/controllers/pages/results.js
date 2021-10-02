// Import
const sequelize = require('../../lib/sequelize');

// Page Size
const size = 10;

// Export Route
module.exports = async (req, res) => {
	try {
		// Require Login
		if (!req.isAuthenticated()) return res.redirect('/');

		// Count Records
		const count = await sequelize.models.result.count();

		// Total Pages
		const pages = Math.ceil(count / size);

		// Requested Page
		const page = parseFloat(req.query.page);

		// Check Page
		if (isNaN(page)) return res.redirect('?page=1');

		if (!Number.isInteger(page)) return res.redirect('?page=' + parseInt(page));

		if (page < 1) return res.redirect('?page=1');

		if (page > pages) return res.redirect('?page=' + pages);

		// Read Records
		const records = await sequelize.models.result.findAll({
			limit: size,
			offset: page * size - size
		});

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
