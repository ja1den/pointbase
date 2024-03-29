/* ----- Globals ----- */

const baseURL = '/api/users';

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

		// Parse Data
		if (data.password === '') delete data.password;

		data.elevated = createUpdateForm.querySelector('#record-elevated').checked;

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
			if (response.status === 409) return createUpdateForm.showErrorMessage('#record-name, #record-email');
			if (response.status !== 201) return;
		} else {
			// Update Record
			response = await fetch(baseURL + '/' + createUpdateForm.dataset.recordId, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data)
			});

			// Error?
			if (response.status === 409) return createUpdateForm.showErrorMessage('#record-name, #record-email');
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
	document.querySelector('#record-modal .modal-title').innerHTML = 'Create User';

	// Unset Record ID
	delete createUpdateForm.dataset.recordId;

	// Require Password
	createUpdateForm.querySelector('#record-password').setAttribute('required', '');

	// Enable Elevated
	createUpdateForm.querySelector('#record-elevated').removeAttribute('disabled');

	// Hide Popover
	createUpdateForm.querySelector('label i.bi-info-circle').classList.add('d-none');
});

/* ----- Update ----- */

// Handle Click
updateLinks.forEach(element => element.addEventListener('click', event => {
	// Prevent Default
	event.preventDefault();

	// Update Title
	document.querySelector('#record-modal .modal-title').innerHTML = 'Update User';

	// Unrequire Password
	createUpdateForm.querySelector('#record-password').removeAttribute('required');

	// Disable Elevated
	if (element.dataset.current !== undefined) {
		createUpdateForm.querySelector('#record-elevated').setAttribute('disabled', '');
	} else {
		createUpdateForm.querySelector('#record-elevated').removeAttribute('disabled');
	}

	// Show Popover
	createUpdateForm.querySelector('label i.bi-info-circle').classList.remove('d-none');

	// Set Record ID
	createUpdateForm.dataset.recordId = element.dataset.recordId;

	// Populate Form
	const inputs = [...createUpdateForm.getElementsByTagName('input')];

	inputs[0].value = records[element.dataset.recordId][0];
	inputs[1].value = records[element.dataset.recordId][1];

	inputs[3].checked = records[element.dataset.recordId][2];
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
