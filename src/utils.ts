import { FilePosition } from './lookup-types';

export function calculateMove(
	file1: FilePosition,
	file2: FilePosition
): number 

{
	const positionLookup = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8 };

	return positionLookup[file2] - positionLookup[file1];
}
