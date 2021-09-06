/* ----- Globals ----- */

const baseURL = '/api/houses';

/* ----- Locate Elements ----- */

// Form
const createUpdateForm = document.getElementById('record-form');

// Create Link
const createLink = document.querySelector('a[aria-label="Create Record"]');

// Update and Delete
const updateLinks = document.querySelectorAll('a[aria-label="Update Record"]');
const deleteLinks = document.querySelectorAll('a[aria-label="Delete Record"]');

/* ----- Setup ----- */

// Parse Table Data
const records = [];

document.querySelectorAll('#record-table tbody tr').forEach(element => records[element.dataset.recordId] = [
	element.children[0].innerHTML,
	element.children[1].innerHTML,
	element.children[2].innerHTML.includes('check')
]);

/* ----- Create and Update ----- */

// Handle Submit
createUpdateForm?.addEventListener('submit', async event => {
	// Prevent Default
	event.preventDefault();

	// Check Form
	if (createUpdateForm.checkValidity()) {
		// Read Data
		const data = Object.fromEntries(new FormData(createUpdateForm).entries());

		data.active = createUpdateForm.querySelector('#record-active').checked;

		// Emit Request
		let response = null;

		if (createUpdateForm.dataset.recordId === undefined) {
			// Create Record
			response = await fetch(baseURL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			// Error?
			if (response.status === 409) return createUpdateForm.showErrorMessage('#record-name');
			if (response.status !== 201) return;
		} else {
			// Update Record
			response = await fetch(baseURL + '/' + createUpdateForm.dataset.recordId, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			// Error?
			if (response.status === 409) return createUpdateForm.showErrorMessage('#record-name');
			if (response.status !== 204) return;
		}

		// Reload
		history.go();
	} else {
		// Show Input Errors
		createUpdateForm.showInputErrors();
	}
});

/* ----- Create ----- */

// Handle Click
createLink?.addEventListener('click', event => {
	// Prevent Default
	event.preventDefault();

	// Update Title
	document.querySelector('#record-modal .modal-title').innerHTML = 'Create House';

	// Unset Record ID
	delete createUpdateForm.dataset.recordId;
});

/* ----- Update ----- */

// Handle Click
updateLinks.forEach(element => element.addEventListener('click', event => {
	// Prevent Default
	event.preventDefault();

	// Update Title
	document.querySelector('#record-modal .modal-title').innerHTML = 'Update House';

	// Set Record ID
	createUpdateForm.dataset.recordId = element.dataset.recordId;

	// Populate Form
	const inputs = [...createUpdateForm.getElementsByTagName('input')];

	inputs[0].value = records[element.dataset.recordId][0];
	inputs[1].value = records[element.dataset.recordId][1];

	inputs[2].checked = records[element.dataset.recordId][2];
}));

/* ----- Delete ----- */

// Handle Click
deleteLinks.forEach(element => element.addEventListener('click', async event => {
	// Prevent Default
	event.preventDefault();

	// Confirm?
	if (!confirm('Are you sure?')) return;

	// Read ID
	const id = element.dataset.recordId;

	// Emit Request
	const response = await fetch(baseURL + '/' + id, {
		method: 'DELETE'
	});

	// Error?
	if (response.status !== 204) return;

	// Reload
	history.go();
}));
