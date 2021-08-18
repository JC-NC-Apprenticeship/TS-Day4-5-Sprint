import { FilePosition, RankPosition } from './lookup-types'

export interface I_Position {
    file: FilePosition;
    rank: RankPosition;
    distanceFrom(nextMove: [file: FilePosition, rank: RankPosition]): {
		file: number;
		rank: number;
	} 
}

