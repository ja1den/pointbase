// Export Route
module.exports = async (req, res) => {
	try {
		// Render HTML
		res.render('dashboard', { user: req.user });
	} catch (e) {
		// Log
		console.error(e);

		// Respond
		res.status(500).end();
	}
}
