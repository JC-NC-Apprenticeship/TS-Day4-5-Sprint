import { expect } from 'chai';
import { Position } from '../position';

describe('position class', () => {
  it('an instance of Position has a distanceFrom method which returns an object containing the distances for both file and rank', () => {
    const newPosition = new Position('A', 2);
    expect(typeof newPosition.distanceFrom === 'function').to.be.true;
    const proposedPosition = new Position('B', 3);
    const distanceBetween = newPosition.distanceFrom(proposedPosition);
    expect(distanceBetween).to.deep.equal({ file: 1, rank: 1 });
  });
  it('has an isInPosition method that checks if a provided position matches the position created', () => {
    const newPosition = new Position('A', 2);
    const inPosition = newPosition.isInPosition('A', 2);
    expect(inPosition).to.equal(true);
    const notInPosition = newPosition.isInPosition('B', 4);
    expect(notInPosition).to.equal(false);
  });
});
