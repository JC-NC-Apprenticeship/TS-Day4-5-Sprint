type FileType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type RankType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

class Position {
  private file: FileType;
  private rank: RankType;

  constructor(file: FileType, rank: RankType) {
    this.file = file;
    this.rank = rank;
  }

  distanceFrom(position: Position): { file: number; rank: number } {
    const files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; //have a look at charAt(0)
    const indexOfCurrentFile = files.indexOf(this.file);
    const indexOfNewFile = files.indexOf(position.file);
    const file = indexOfNewFile - indexOfCurrentFile;
    const rank = position.rank - this.rank;

    return { file, rank };
  }

  isInPosition(file: FileType, rank: RankType): boolean {
    return file === this.file && rank === this.rank;
  }
}

export { Position, FileType, RankType };
