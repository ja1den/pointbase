/* ----- Global ----- */

// Chart List
let charts = [];

/* ----- Setup ----- */

// Populate Charts
const populateCharts = () => {
	// Chart Elements
	const chartElements = [
		document.getElementById('chart-1'),
		document.getElementById('chart-2')
	];

	// Convert Dates
	Object.entries(intervalData).forEach(house => house[1].forEach(datapoint => datapoint.x = new Date(datapoint.x)));

	// Chart List
	charts = [];

	// Chart 1
	if (Object.keys(sportHouseData).length !== 0 && charts[0] === undefined) {
		charts[0] = new Chart(chartElements[0], {
			type: 'bar',
			data: {
				labels: houses.map(house => house.name),
				datasets: Object.entries(sportHouseData).map((entry, index) => ({
					label: entry[0],
					data: entry[1],
					backgroundColor: houses[index % houses.length].colour + '80',
					borderColor: houses[index % houses.length].colour,
					borderWidth: 1
				}))
			},
			options: {
				indexAxis: 'y',
				scales: {
					x: {
						stacked: true,
						ticks: {
							precision: 0
						}
					},
					y: {
						beginAtZero: true,
						stacked: true
					}
				},
				responsive: true,
				maintainAspectRatio: true,
				aspectRatio: 2,
				events: [],
				animation: false,

			}
		});
	} else {
		chartElements[0].classList.add('d-none');
		chartElements[0].parentElement.querySelector('p').classList.remove('d-none');
	}

	// Chart 2
	if (!Object.entries(intervalData).every(entry => entry[1].length === 0) && charts[1] === undefined) {
		charts[1] = new Chart(chartElements[1], {
			type: 'line',
			data: {
				datasets: Object.entries(intervalData).map(entry => ({
					label: entry[0],
					data: entry[1],
					backgroundColor: houses.find(house => house.name === entry[0]).colour + '80',
					borderColor: houses.find(house => house.name === entry[0]).colour,
					borderWidth: 1
				}))
			},
			options: {
				scales: {
					x: {
						type: 'time',
						time: {
							displayFormats: {
								minute: 'hh:mm'
							},
							unit: 'minute',
							stepSize: interval / 60
						}
					},
					y: {
						ticks: {
							precision: 0
						}
					}
				},
				responsive: true,
				maintainAspectRatio: true,
				aspectRatio: 2,
				events: [],
				animation: false
			}
		});
	} else {
		chartElements[1].classList.add('d-none');
		chartElements[1].parentElement.querySelector('p').classList.remove('d-none');
	}
}
populateCharts();

/* ----- Handle Resize ----- */

const handleResize = () => {
	const containerElement = document.querySelector('.container');

	const size = containerElement.clientWidth * (innerWidth >= 992 ? 0.5 : 1) + 'px';

	charts.forEach(chart => {
		chart.canvas.parentNode.parentNode.parentNode.style.width = size;
	});
}
handleResize();

addEventListener('resize', handleResize);

/* ----- Sockets ----- */

const socket = io();

socket.on('update', async eventId => {
	// Requested Event
	const requestedEvent = new URLSearchParams(location.search).get('event');

	// Event?
	if (eventId === requestedEvent) {
		// Request Page
		const pageHTML = await fetch(location.href).then(response => response.text());

		// Parse Page
		const page = (new DOMParser()).parseFromString(pageHTML, 'text/html');

		// Source and Update
		const source = page.querySelectorAll('body > .container');
		const update = document.querySelectorAll('body > .container');

		// Update Rows
		for (let i = 0; i < source.length; i++) update[i].replaceWith(source[i]);

		// Update Chart Data
		eval(page.querySelector('script:nth-last-of-type(2)').innerHTML.replace(/let\s/g, ''));

		// Populate Charts
		populateCharts();
	}
});
