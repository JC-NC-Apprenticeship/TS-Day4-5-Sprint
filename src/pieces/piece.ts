import { FileType, RankType, Position } from '../position';

type ColourType = 'black' | 'white';

abstract class Piece {
  protected position: Position;
  protected readonly colour: ColourType;
  protected captured: boolean;

  constructor(file: FileType, rank: RankType, colour: ColourType) {
    this.position = new Position(file, rank);
    this.colour = colour;
    this.captured = false;
  }

  moveTo(newPosition: Position): void {
    this.position = newPosition;
  }
  isCaptured(): boolean {
    return this.captured;
  }
  capture(): void {
    this.captured = true;
  }

  getPosition(): Position {
    return this.position;
  }

  getColour(): ColourType {
    return this.colour;
  }

  isInPosition(file: FileType, rank: RankType): boolean {
    const currentPiecePosition = this.getPosition();
    return currentPiecePosition.isInPosition(file, rank);
  }
  abstract canMoveTo(position: Position, isCapturing?: boolean): boolean;
}

export { Piece, ColourType };
