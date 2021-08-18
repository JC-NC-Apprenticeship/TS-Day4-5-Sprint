import { expect } from 'chai';
import { calculateMove } from './utils';

describe('calculateMove', () => {
	it('returns correct move value', () => {
		expect(calculateMove('B', 'C')).to.equal(1); // 2, 3
		expect(calculateMove('E', 'A')).to.equal(-4); // 5, 1
	});
});
