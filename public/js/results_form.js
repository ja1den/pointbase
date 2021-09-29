/* ----- Locate Elements ----- */

// Form
const resultForm = document.getElementById('result-form');

/* ----- Result Form ----- */

// Handle Submit
resultForm?.addEventListener('submit', async event => {
	// Prevent Default
	event.preventDefault();

	// Check Form
	if (resultForm.checkValidity()) {
		// Read Data
		const data = Object.fromEntries(new FormData(resultForm).entries());

		// Records
		const records = [];

		// Switch on Sport Type
		switch (resultForm.dataset.sportType) {
			case 'House Ranking':
			case 'House Ranking, plus Bonus':
				// Parse Fields
				const places = [];

				for (const key in data) if (key.startsWith('places')) places[parseInt(key.match(/\d+/))] = data[key];

				// Check Places
				if (new Set(places).size !== places.length) return resultForm.showErrorMessage();

				// Push Records
				for (let i = 0; i < Math.min(places.length, 5); i++) {
					records.push({
						eventId: resultForm.dataset.eventId,
						sportId: resultForm.dataset.sportId,
						houseId: places[i],
						points: 5 - i,
						timestamp: new Date()
					});
				}

				// Bonus?
				if (resultForm.dataset.sportType !== 'House Ranking, plus Bonus') break;

				// Push Records
				for (const key in data) {
					if (key.startsWith('bonus') && data[key] > 0) {
						records.push({
							eventId: resultForm.dataset.eventId,
							sportId: resultForm.dataset.sportId,
							houseId: parseInt(key.match(/\d+/)),
							points: data[key],
							timestamp: new Date()
						});
					}
				}
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
		resultForm.showInputErrors();
	}
});

// Handle Reset
resultForm?.addEventListener('reset', () => resultForm?.resetStyles());

/* ----- Radio Buttons ----- */

// Handle Click
document.querySelectorAll('input').forEach(element => {
	// Parent Type
	if (element.parentNode?.nodeName !== 'TD') return;

	// Parent 'onclick'
	element.parentNode.addEventListener('click', () => element.click());
});
