import { expect } from 'chai';
import { Position } from '../position';
import { Pawn } from '../pieces/pawn';
import { Rook } from '../pieces/rook';
import { Bishop } from '../pieces/bishop';
import { Knight } from '../pieces/knight';
import { King } from '../pieces/king';
import { Queen } from '../pieces/queen';

describe('piece class via individual Pawn subclasses', () => {
  it('an instance of Pawn has a position property, the value of which is an object containing the correct rank and file', () => {
    const newPawn = new Pawn('A', 2, 'white');
    expect(newPawn.getPosition()).to.deep.equal({ file: 'A', rank: 2 });
  });
  it('an instance of Pawn has a colour property set to a passed colour value and a captured property initialised to false', () => {
    const newPawn = new Pawn('A', 2, 'black');
    expect(newPawn.isCaptured()).to.equal(false);
  });
  it('has a moveTo method that sets it position', () => {
    const newPawn = new Pawn('A', 2, 'black');
    expect(typeof newPawn.moveTo === 'function').to.be.true;
    const newPosition = new Position('A', 3);
    newPawn.moveTo(newPosition);
    const movedPosition = newPawn.getPosition();
    expect(movedPosition).to.deep.equal({ file: 'A', rank: 3 });
  });
  it('has a capture method that sets the capture property', () => {
    const newPawn = new Pawn('A', 2, 'black');
    expect(typeof newPawn.capture === 'function').to.be.true;
    newPawn.capture();
    expect(newPawn.isCaptured()).to.be.true;
  });
  it('has a canMoveTo method, that allows a Pawn to more 2 spaces on the first move only', () => {
    const newPawn = new Pawn('A', 7, 'black');
    expect(typeof newPawn.canMoveTo === 'function').to.be.true;
    let proposedPosition = new Position('A', 5);
    let isMoveValid = newPawn.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    newPawn.moveTo(proposedPosition);
    proposedPosition = new Position('A', 3);
    isMoveValid = newPawn.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.false;
    proposedPosition = new Position('A', 4);
    isMoveValid = newPawn.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
  });
  it('has a canMoveTo method, that checks the validity of a proposed move', () => {
    const newPawn = new Pawn('A', 3, 'black');
    expect(typeof newPawn.canMoveTo === 'function').to.be.true;
    let proposedPosition = new Position('A', 1);
    let isMoveValid = newPawn.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    proposedPosition = new Position('C', 7);
    isMoveValid = newPawn.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.false;
  });
  it('has an isInPositionMethod that checks whether the position provided matches the piece created', () => {
    const newPawn = new Pawn('A', 3, 'black');
    const inPosition = newPawn.isInPosition('A', 3);
    expect(inPosition).to.equal(true);
    const notInPosition = newPawn.isInPosition('B', 4);
    expect(notInPosition).to.equal(false);
  });
  it('has a getColour method that returns the colour of the piece passed', () => {
    const newPawn = new Pawn('A', 3, 'black');
    const colour = newPawn.getColour();
    expect(colour).to.equal('black');
  });
});

describe('rook', () => {
  it('an instance of Rook has a position property, the value of which is an object containing the correct rank and file', () => {
    const newRook = new Rook('A', 2, 'white');
    expect(newRook.getPosition()).to.deep.equal({ file: 'A', rank: 2 });
  });
  it('an instance of Rook has a colour property set to a passed colour value and a captured property initialised to false', () => {
    const newRook = new Rook('A', 2, 'black');
    expect(newRook.isCaptured()).to.equal(false);
  });
  it('has a moveTo method that sets it position', () => {
    const newRook = new Rook('A', 2, 'black');
    expect(typeof newRook.moveTo === 'function').to.be.true;
    const newPosition = new Position('A', 3);
    newRook.moveTo(newPosition);
    expect(newRook.getPosition()).to.deep.equal({ file: 'A', rank: 3 });
  });
  it('has a capture method that sets the capture property', () => {
    const newRook = new Rook('A', 2, 'black');
    expect(typeof newRook.capture === 'function').to.be.true;
    newRook.capture();
    expect(newRook.isCaptured()).to.be.true;
  });
  it('has a canMoveTo method, that checks the validity of a proposed move', () => {
    const newRook = new Rook('A', 3, 'black');
    expect(typeof newRook.canMoveTo === 'function').to.be.true;
    let proposedPosition = new Position('A', 1);
    let isMoveValid = newRook.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    proposedPosition = new Position('C', 7);
    isMoveValid = newRook.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.false;
    proposedPosition = new Position('F', 3);
    isMoveValid = newRook.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
  });
});

describe('bishop', () => {
  it('an instance of Bishop has a position property, the value of which is an object containing the correct rank and file', () => {
    const newBishop = new Bishop('A', 2, 'white');
    expect(newBishop.getPosition()).to.deep.equal({ file: 'A', rank: 2 });
  });
  it('an instance of Bishop has a colour property set to a passed colour value and a captured property initialised to false', () => {
    const newBishop = new Bishop('A', 2, 'black');
    expect(newBishop.isCaptured()).to.equal(false);
  });
  it('has a moveTo method that sets it position', () => {
    const newBishop = new Bishop('A', 2, 'black');
    expect(typeof newBishop.moveTo === 'function').to.be.true;
    const newPosition = new Position('A', 3);
    newBishop.moveTo(newPosition);
    expect(newBishop.getPosition()).to.deep.equal({ file: 'A', rank: 3 });
  });
  it('has a capture method that sets the capture property', () => {
    const newBishop = new Bishop('A', 2, 'black');
    expect(typeof newBishop.capture === 'function').to.be.true;
    newBishop.capture();
    expect(newBishop.isCaptured()).to.be.true;
  });
  it('has a canMoveTo method, that checks the validity of a proposed move', () => {
    const newBishop = new Bishop('A', 3, 'black');
    expect(typeof newBishop.canMoveTo === 'function').to.be.true;
    let proposedPosition = new Position('B', 4);
    let isMoveValid = newBishop.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    proposedPosition = new Position('C', 7);
    isMoveValid = newBishop.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.false;
    proposedPosition = new Position('C', 1);
    isMoveValid = newBishop.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
  });
});

describe('knight', () => {
  it('an instance of Knight has a position property, the value of which is an object containing the correct rank and file', () => {
    const newKnight = new Knight('A', 2, 'white');
    expect(newKnight.getPosition()).to.deep.equal({ file: 'A', rank: 2 });
  });
  it('an instance of Knight has a colour property set to a passed colour value and a captured property initialised to false', () => {
    const newKnight = new Knight('A', 2, 'black');
    expect(newKnight.isCaptured()).to.equal(false);
  });
  it('has a moveTo method that sets it position', () => {
    const newKnight = new Knight('A', 2, 'black');
    expect(typeof newKnight.moveTo === 'function').to.be.true;
    const newPosition = new Position('A', 3);
    newKnight.moveTo(newPosition);
    expect(newKnight.getPosition()).to.deep.equal({ file: 'A', rank: 3 });
  });
  it('has a capture method that sets the capture property', () => {
    const newKnight = new Knight('A', 2, 'black');
    expect(typeof newKnight.capture === 'function').to.be.true;
    newKnight.capture();
    expect(newKnight.isCaptured()).to.be.true;
  });
  it('has a canMoveTo method, that checks the validity of a proposed move', () => {
    const newKnight = new Knight('A', 3, 'black');
    expect(typeof newKnight.canMoveTo === 'function').to.be.true;
    let proposedPosition = new Position('C', 4);
    let isMoveValid = newKnight.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    proposedPosition = new Position('B', 1);
    isMoveValid = newKnight.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    proposedPosition = new Position('C', 1);
    isMoveValid = newKnight.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.false;
  });
});
describe('king', () => {
  it('an instance of King has a position property, the value of which is an object containing the correct rank and file', () => {
    const newKing = new King('A', 2, 'white');
    expect(newKing.getPosition()).to.deep.equal({ file: 'A', rank: 2 });
  });
  it('an instance of King has a colour property set to a passed colour value and a captured property initialised to false', () => {
    const newKing = new King('A', 2, 'black');
    expect(newKing.isCaptured()).to.equal(false);
  });
  it('has a moveTo method that sets it position', () => {
    const newKing = new King('A', 2, 'black');
    expect(typeof newKing.moveTo === 'function').to.be.true;
    const newPosition = new Position('A', 3);
    newKing.moveTo(newPosition);
    expect(newKing.getPosition()).to.deep.equal({ file: 'A', rank: 3 });
  });
  it('has a capture method that sets the capture property', () => {
    const newKing = new King('A', 2, 'black');
    expect(typeof newKing.capture === 'function').to.be.true;
    newKing.capture();
    expect(newKing.isCaptured()).to.be.true;
  });
  it('has a canMoveTo method, that checks the validity of a proposed move', () => {
    const newKing = new King('A', 3, 'black');
    expect(typeof newKing.canMoveTo === 'function').to.be.true;
    let proposedPosition = new Position('B', 4);
    let isMoveValid = newKing.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    proposedPosition = new Position('A', 4);
    isMoveValid = newKing.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    proposedPosition = new Position('A', 5);
    isMoveValid = newKing.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.false;
  });
});

describe('queen', () => {
  it('an instance of Queen has a position property, the value of which is an object containing the correct rank and file', () => {
    const newQueen = new Queen('A', 2, 'white');
    expect(newQueen.getPosition()).to.deep.equal({ file: 'A', rank: 2 });
  });
  it('an instance of Queen has a colour property set to a passed colour value and a captured property initialised to false', () => {
    const newQueen = new Queen('A', 2, 'black');

    expect(newQueen.isCaptured()).to.equal(false);
  });
  it('has a moveTo method that sets it position', () => {
    const newQueen = new Queen('A', 2, 'black');
    expect(typeof newQueen.moveTo === 'function').to.be.true;
    const newPosition = new Position('A', 3);
    newQueen.moveTo(newPosition);
    expect(newQueen.getPosition()).to.deep.equal({ file: 'A', rank: 3 });
  });
  it('has a capture method that sets the capture property', () => {
    const newQueen = new Queen('A', 2, 'black');
    expect(typeof newQueen.capture === 'function').to.be.true;
    newQueen.capture();
    expect(newQueen.isCaptured()).to.be.true;
  });
  it('has a canMoveTo method, that checks the validity of a proposed move', () => {
    const newQueen = new Queen('A', 3, 'black');
    expect(typeof newQueen.canMoveTo === 'function').to.be.true;
    let proposedPosition = new Position('B', 4);
    let isMoveValid = newQueen.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    proposedPosition = new Position('A', 4);
    isMoveValid = newQueen.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    proposedPosition = new Position('C', 1);
    isMoveValid = newQueen.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.true;
    proposedPosition = new Position('C', 2);
    isMoveValid = newQueen.canMoveTo(proposedPosition);
    expect(isMoveValid).to.be.false;
  });
});
