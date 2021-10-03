/* ----- Locate Elements ----- */

// Form
const resultsForm = document.getElementById('result-form');

/* ----- Result Form ----- */

// Handle Submit
resultsForm?.addEventListener('submit', async event => {
	// Prevent Default
	event.preventDefault();

	// Check Form
	if (resultsForm.checkValidity()) {
		// Read Data
		const data = Object.fromEntries(new FormData(resultsForm).entries());

		// Records
		const records = [];

		// Switch on Sport Type
		switch (resultsForm.dataset.sportType) {
			case 'House Placement':
			case 'House Placement, plus Bonus':
			case 'Placement and Participation':
				// Parse Fields
				const places = [];

				for (const key in data) if (key.startsWith('places')) places[parseInt(key.match(/\d+/))] = data[key];

				// Check Places
				if (resultsForm.dataset.sportType !== 'Placement and Participation')
					if (new Set(places).size !== places.length) return resultsForm.showErrorMessage();

				// Push Records
				for (let i = 0; i < Math.min(places.length, 5); i++) {
					records.push({
						eventId: resultsForm.dataset.eventId,
						sportId: resultsForm.dataset.sportId,
						houseId: places[i],
						points: 5 - i,
						timestamp: new Date()
					});
				}

				// Bonus?
				if (resultsForm.dataset.sportType === 'House Placement') break;

				// Push Records
				for (const key in data) {
					if (key.startsWith('bonus') && data[key] > 0) {
						records.push({
							eventId: resultsForm.dataset.eventId,
							sportId: resultsForm.dataset.sportId,
							houseId: parseInt(key.match(/\d+/)),
							points: data[key],
							timestamp: new Date()
						});
					}
				}
				break;

			case 'Student Points':
				// Push Record
				records.push({
					eventId: resultsForm.dataset.eventId,
					sportId: resultsForm.dataset.sportId,
					houseId: parseInt(data.houseId),
					points: parseInt(data.points),
					timestamp: new Date()
				});
				break;
		}

		// Iterate Records
		for (const record of records) {
			// Emit Request
			const response = await fetch('/api/results', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(record)
			});

			// Error?
			if (response.status !== 201) return;
		}

		// Reload
		history.go();
	} else {
		// Show Input Errors
		resultsForm.showInputErrors();
	}
});

// Handle Reset
resultsForm?.addEventListener('reset', () => resultsForm?.resetStyles());

/* ----- Radio Buttons ----- */

// Handle Click
document.querySelectorAll('input').forEach(element => {
	// Parent Type
	if (element.parentNode?.nodeName !== 'TD') return;

	// Parent 'onclick'
	element.parentNode.addEventListener('click', () => element.click());
});
