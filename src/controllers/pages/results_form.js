// Import
const sequelize = require('../../lib/sequelize');

module.exports = async (req, res) => {
	try {
		// Require Login
		if (!req.isAuthenticated()) return res.redirect('/');

		// Read Sports
		const sports = await sequelize.models.sport.findAll({
			include: [
				sequelize.models.sport_type
			],
			where: { active: true }
		});

		// Check Sport
		const sportId = parseFloat(req.query.sport);

		if (isNaN(sportId)) return res.redirect('?sport=' + sports[0].id);

		if (!Number.isInteger(sportId)) return res.redirect('?sport=' + parseInt(sportId));

		// Requested Sport
		const sport = sports.find(sport => sport.id === sportId);

		if (sport === undefined) return res.redirect('?sport=' + sports[0].id);

		// Read Event
		const event = await sequelize.models.event.findOne({ where: { active: true } });

		// Read Houses
		const houses = await sequelize.models.house.findAll({ where: { active: true } });

		// Render HTML
		res.render('results_form', { user: req.user, sports, sport, event, houses });
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
}
