// Import
const { Op } = require('sequelize');

// Lib
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
			attributes: ['id', 'name', 'colour', [sequelize.cast(sequelize.fn('SUM', sequelize.col('points')), 'SIGNED'), 'points']],
			include: [
				{
					model: sequelize.models.result,
					required: false,
					attributes: [],
					where: { eventId }
				}
			],
			where: {
				[Op.or]: [
					event.active && { active: true },
					sequelize.where(sequelize.col('points'), { [Op.ne]: 0 })
				]
			},
			group: ['house.name'],
			order: [[sequelize.col('name')]]
		});

		// Results per House per Sport
		let sportHouseData = await sequelize.models.result.findAll({
			attributes: [[sequelize.cast(sequelize.fn('SUM', sequelize.col('points')), 'SIGNED'), 'points']],
			include: [
				{
					model: sequelize.models.house,
					attributes: ['id', 'name']
				},
				{
					model: sequelize.models.sport,
					attributes: ['id', 'name']
				}
			],
			where: { eventId },
			group: ['house.name', 'sport.name'],
			order: [[sequelize.models.sport, 'name'], [sequelize.models.house, 'name']]
		});

		// Process House Sport Data
		sportHouseData = sportHouseData.reduce((sportHouseData, record) => {
			const sportData = sportHouseData[record.sport.name] ?? [];

			const index = houses.findIndex(house => house.name === record.house.name);

			sportData[index] = record.points;

			return { ...sportHouseData, [record.sport.name]: sportData };
		}, {});

		// Interval
		const interval = 15 * 60;

		// Results per Interval
		let intervalData = await sequelize.models.result.findAll({
			attributes: [
				[sequelize.literal(`FROM_UNIXTIME((UNIX_TIMESTAMP(result.timestamp) DIV ${interval} + 1) * ${interval})`), 'interval'],
				[sequelize.cast(sequelize.fn('SUM', sequelize.col('points')), 'SIGNED'), 'points']
			],
			include: [
				{
					model: sequelize.models.house,
					attributes: ['name']
				}
			],
			where: { eventId },
			group: ['house.name', sequelize.literal(`FROM_UNIXTIME((UNIX_TIMESTAMP(result.timestamp) DIV ${interval} + 1) * ${interval})`)],
			order: [[sequelize.models.house, 'name'], sequelize.col('interval')]
		});

		// Process Interval Data
		intervalData = intervalData.reduce((intervalData, record) => {
			const houseData = intervalData[record.house.name] ?? [];

			if (houseData.length === 0) {
				houseData.push({ x: new Date(record.get('interval') - interval * 1000), y: 0 });
			}

			houseData.push({ x: record.get('interval'), y: houseData[houseData.length - 1].y + record.get('points') });

			return { ...intervalData, [record.house.name]: houseData };
		}, houses.reduce((init, house) => void (init[house.name] = []) ?? init, {}));

		// Render HTML
		res.render('dashboard', { user: req.user, events, event, houses, sportHouseData, interval, intervalData });
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
}
