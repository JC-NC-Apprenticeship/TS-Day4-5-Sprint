import { Piece, ColourType } from './piece';
import { FileType, RankType, Position } from '../position';

class Bishop extends Piece {
  constructor(file: FileType, rank: RankType, colour: ColourType) {
    super(file, rank, colour);
  }

  canMoveTo(position: Position): boolean {
    const { file, rank } = this.position.distanceFrom(position);
    if (Math.abs(file) === Math.abs(rank)) return true;
    return false;
  }
}

export { Bishop };
