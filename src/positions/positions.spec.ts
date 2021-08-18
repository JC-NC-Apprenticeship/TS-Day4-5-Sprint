import { expect } from 'chai';
import Position from './positionClass';

describe('Position', () => {
	it('creates new Position object', () => {
		const testPosition = new Position('A', 3);
		expect(testPosition).to.be.an.instanceOf(Position);
	});
	it('distanceFrom method should work as intended', () => {
		const testPosition = new Position('C', 3);
		expect(testPosition.distanceFrom(['B', 4])).to.contain({
			file: -1,
			rank: 1
		});
		const testPosition2 = new Position('A', 1);
		expect(testPosition2.distanceFrom(['F', 6])).to.contain({
			file: 5,
			rank: 5
		});
	});
});
