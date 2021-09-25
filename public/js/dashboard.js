/* ----- Process Data ----- */

// Convert Dates
Object.entries(intervalData).forEach(house => house[1].forEach(datapoint => datapoint.x = new Date(datapoint.x)));

/* ----- Define Charts ----- */

// Chart List
const charts = [];

// Chart 1
if (Object.keys(sportHouseData).length !== 0) {
	charts[0] = new Chart(document.getElementById('chart-1'), {
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
					stacked: true
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
}

// Chart 2
if (Object.keys(intervalData).length !== 0) {
	charts[1] = new Chart(document.getElementById('chart-2'), {
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
				}
			},
			responsive: true,
			maintainAspectRatio: true,
			aspectRatio: 2,
			events: [],
			animation: false
		}
	});
}

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
