import { Piece, ColourType } from './piece';
import { FileType, RankType, Position } from '../position';

class King extends Piece {
  constructor(file: FileType, rank: RankType, colour: ColourType) {
    super(file, rank, colour);
  }

  canMoveTo(position: Position): boolean {
    const { file, rank } = this.position.distanceFrom(position);
    if (Math.abs(file) === 1 || Math.abs(rank) === 1) return true;
    return false;
  }
}

export { King };
