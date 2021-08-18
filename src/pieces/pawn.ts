import { Piece, ColourType } from './piece';
import { FileType, RankType, Position } from '../position';

class Pawn extends Piece {
  private hasMoved: boolean;

  constructor(file: FileType, rank: RankType, colour: ColourType) {
    super(file, rank, colour);
    this.hasMoved = false;
  }

  canMoveTo(position: Position, isCapturing?: boolean): boolean {
    const { file, rank } = this.position.distanceFrom(position);

    if (Math.abs(file) === 1 && Math.abs(rank) === 1 && isCapturing)
      return true;

    if (file !== 0) return false;

    let validRankMove: number;
    if (this.hasMoved) validRankMove = 1;
    else validRankMove = 2;

    if (!this.hasMoved) {
      if (
        (this.colour === 'black' && rank === -validRankMove) ||
        (this.colour === 'black' && rank === -validRankMove + 1)
      )
        return true;
      else if (
        (this.colour === 'white' && rank === validRankMove) ||
        (this.colour === 'white' && rank === validRankMove - 1)
      )
        return true;
      return false;
    } else {
      if (this.colour === 'black' && rank === -validRankMove) return true;
      else if (this.colour === 'white' && rank === validRankMove) return true;
      return false;
    }
  }

  moveTo(newPosition: Position): void {
    this.position = newPosition;
    this.hasMoved = true;
  }
}

export { Pawn };
