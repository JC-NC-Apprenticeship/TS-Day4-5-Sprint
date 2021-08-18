import { FilePosition, RankPosition, PieceColour } from '../lookup-types';
import Position from '../positions/positionClass';
import Piece from './pieceClass';

class Rook extends Piece {
	// Is this missing something to do with captured I think.

	constructor(
		pieceColour: PieceColour,
		pieceFile: FilePosition,
		pieceRank: RankPosition
	) {
		super(pieceColour, pieceFile, pieceRank);
	}

	canMoveTo(file: FilePosition, rank: RankPosition): boolean {
		if (file === this.currentPosition.file) {
		}
		// if file === this.pieceFile : true
		//
		return true;
	}
	// option one same rank different file
	// option 2 different rank same file
	// anything else is false
}

const newRook = new Rook('Black', 'A', 1);

console.log(newRook);
