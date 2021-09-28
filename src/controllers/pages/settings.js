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
		const count = await sequelize.models.user.count();

		// Total Pages
		const pages = Math.ceil(count / size);

		// Requested Page
		const page = parseFloat(req.query.page);

		// Check Page
		if (isNaN(page)) return res.redirect('?page=1');

		if (!Number.isInteger(page)) return res.redirect('?page=' + parseInt(page));

		if (page < 1) return res.redirect('?page=1');

		if (pages < page) return res.redirect('?page=' + pages);

		// Read Records
		const records = await sequelize.models.user.findAll({
			attributes: { exclude: ['password'] },
			limit: size,
			offset: page * size - size
		});

		// Render HTML
		res.render('settings', { user: req.user, records, page, pages });
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
}
