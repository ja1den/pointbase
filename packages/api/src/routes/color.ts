// Import
import { Request, Response } from 'express';

// Lib
import getRandom from '@lib/getRandom';
import colors from '@lib/colors';

// Export
export default async (_req: Request, res: Response) => {
	res.send(colors[getRandom(0, colors.length)]);
}
