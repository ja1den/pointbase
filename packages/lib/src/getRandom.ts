/**
 * Generate a random number between min and max.
 * @param min The minimum number, inclusive.
 * @param max The maximum number, exclusive.
 * @returns The random number.
 */
export default function getRandom(min: number, max: number) {
	return Math.floor(Math.random() * (max - min)) + min;
}
