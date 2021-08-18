import { FilePosition, RankPosition, PieceColour } from '../lookup-types';
import Piece from './pieceClass';

class Pawn extends Piece {
	// This is to determine if the pawn has been moved
	hasMoved: boolean = false;

	constructor(
		pieceColour: PieceColour,
		pieceFile: FilePosition,
		pieceRank: RankPosition
	) {
		super(pieceColour, pieceFile, pieceRank);
	}

	// setMove () {
	//     if(!this.hasMoved) {
	//         this.canMoveTo () {

	//         }
	//         this.hasMoved = true
	//     } else {
	//         this.canMoveTo () {
	//            this.currentPosition.distanceFrom('A',2)
	//         }
	//     }
	// }

	canMoveTo() {
		return true;
	}
}

const newPawn = new Pawn('Black', 'A', 1);

console.log(newPawn);
