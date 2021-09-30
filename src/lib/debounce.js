// Debounce
const debounce = function (func, delay) {
	let timeout;

	return function () {
		const context = this, args = arguments;

		const later = function () {
			timeout = null;
			func.apply(context, args);
		};

		clearTimeout(timeout);

		timeout = setTimeout(later, delay);
	};
};

// Export
module.exports = debounce;
