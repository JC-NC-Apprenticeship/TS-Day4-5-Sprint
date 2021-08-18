import { Piece, ColourType } from './piece';
import { FileType, RankType, Position } from '../position';

class Rook extends Piece {
  constructor(file: FileType, rank: RankType, colour: ColourType) {
    super(file, rank, colour);
  }

  canMoveTo(position: Position): boolean {
    const { file, rank } = this.position.distanceFrom(position);

    if (file === 0 || rank === 0) return true;
    return false;
  }
}

export { Rook };
