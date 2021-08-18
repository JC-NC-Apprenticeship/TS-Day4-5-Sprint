import { FilePosition, RankPosition } from '../lookup-types';
import { calculateMove } from '../utils';
// import { I_Position } from '../interfaces'

// export class Position implements I_Position {
class Position {
	constructor(private file: FilePosition, private rank: RankPosition) {
		this.file = file;
		this.rank = rank;
	}
	
	distanceFrom(nextMove: [file: FilePosition, rank: RankPosition]): {
		file: number;
		rank: number;
	} {
		const fileMove: number = calculateMove(this.file, nextMove[0]);
		const rankMove: number = nextMove[1] - this.rank;

		return {
			file: fileMove,
			rank: rankMove
		};
	}
}

export default Position;

//positionOne ===> C:3, 3  //current
//otherPosition ===> B:2, 4 //next

//should evaluate to ----> {file: -1, rank: 1}
