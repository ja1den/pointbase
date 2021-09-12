// Import
const sequelize = require('../../lib/sequelize');

// Export Route
module.exports = async (req, res) => {
	try {
		// Read Events
		const events = await sequelize.models.event.findAll({ order: [['active', 'DESC']] });

		// Check Event
		const eventId = parseFloat(req.query.event);

		if (isNaN(eventId)) return res.redirect('?event=' + events[0].id);

		if (!Number.isInteger(eventId)) return res.redirect('?event=' + parseInt(eventId));

		// Requested Event
		const event = events.find(event => event.id === eventId);

		if (event === undefined) return res.redirect('?event=' + events[0].id);

		// Read Houses
		const houses = await sequelize.models.house.findAll({
			include: [
				{
					model: sequelize.models.result,
					required: false,
					include: [
						sequelize.models.sport
					],
					where: { eventId }
				}
			]
		});

		// Read Sports
		const sports = await sequelize.models.sport.findAll({ where: { active: true } });

		// Results per Sport
		const sportResults = sports.reduce(
			(sportResults, sport) => ({
				...sportResults,
				[sport.name]: houses.reduce((houseResults, house) => ({
					...houseResults, [house.name]: 0
				}), {})
			}), {}
		);

		for (const house of houses) for (const result of house.results) {
			if (sportResults[result.sport.name]?.[house.name] !== undefined) sportResults[result.sport.name][house.name] += result.points;
		}

		// Render HTML
		res.render('dashboard', { user: req.user, events, event, houses, sportResults });
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
}
