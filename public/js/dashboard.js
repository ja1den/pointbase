/* ----- Define Charts ----- */

const charts = [
	new Chart(document.getElementById('chart-1'), {
		type: 'bar',
		data: {
			labels: houses.map(house => house.name),
			datasets: Object.entries(sportResults).map((sportResult, index) => ({
				label: sportResult[0],
				data: Object.values(sportResult[1]),
				backgroundColor: houses.map(house => house.colour + '80'),
				borderColor: houses.map(house => house.colour),
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
	}),
	new Chart(document.getElementById('chart-2'), {
		options: {
			responsive: true,
			maintainAspectRatio: true,
			aspectRatio: 2,
			events: [],
			animation: false
		}
	})
];

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
