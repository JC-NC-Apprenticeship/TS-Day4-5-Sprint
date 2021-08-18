import { FilePosition, RankPosition, PieceColour } from '../lookup-types';
import Position from '../positions/positionClass';
// import { I_Position } from '../interfaces'
abstract class Piece {
	public pieceColour: PieceColour;
	protected currentPosition: Position; // I_Position;
	protected captured: boolean;

	constructor(
		pieceColour: PieceColour,
		pieceFile: FilePosition,
		pieceRank: RankPosition
	) {
		this.pieceColour = pieceColour;
		this.currentPosition = new Position(pieceFile, pieceRank);
		this.captured = false;
	}

	moveTo(moveToFile: FilePosition, moveToRank: RankPosition) {
		this.currentPosition = new Position(moveToFile, moveToRank);
	}

	abstract canMoveTo(file: FilePosition, rank: RankPosition): boolean;

	//Think this need some connection to individual Pieces
	setCaptured(setCapture: boolean) {
		this.captured = setCapture;
	}
}

export default Piece;
