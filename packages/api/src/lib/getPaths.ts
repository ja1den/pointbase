// Import
import path from 'path';
import fs from 'fs';

/**
 * List all the paths in a directory, excluding subdirectories.
 * @param dir The directory to scan.
 * @param recursive Include subdirectories in the scan.
 * @returns The paths in the target directory.
 */
function getPaths(dir: string, recursive: boolean = true): string[] {
	const dirents = fs.readdirSync(dir, { withFileTypes: true });

	let paths = dirents.map(dirent =>
		dirent.isDirectory()
			? recursive
				? getPaths(path.resolve(dir, dirent.name))
				: null
			: path.resolve(dir, dirent.name)
	);

	return paths.filter(isNotNull).flat();
}

/**
 * Determine if an input is not null.
 * @param input The input.
 * @returns True if the input is not null, and false otherwise.
 */
export function isNotNull<T>(input: T | null): input is T {
	return input !== null;
}

// Export
export default getPaths;
