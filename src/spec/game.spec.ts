import { expect } from 'chai';
import { Game, MessageType } from '../game';
import { Position } from '../position';
import { Piece } from '../pieces/piece';
import { King } from '../pieces/king';
import { Rook } from '../pieces/rook';
import { Pawn } from '../pieces/pawn';

describe('game', () => {
  it('game automatically puts pieces in their starting positions, and current turn is initialised to be white', () => {
    const newGame = new Game();
    const piecesInPlace = newGame.getAllPieces();
    expect(piecesInPlace.length).to.equal(32);
    expect(newGame.isTurn('white')).to.equal(true);
  });

  it('makeTurn invokes a isTurn that allows makeTurn to return an error if it is not the turn of the piece passes', () => {
    const newGame = new Game();
    const errorMessage: MessageType = newGame.makeTurn('A', 7, 'A', 5);
    expect(errorMessage.msg).to.equal('not your turn!');
  });
  it('game has a getPiece method that gets the piece a player intends to play', () => {
    const newGame = new Game();
    const pieceToPlay: Piece = newGame.getPiece('A', 2);
    const proposedPosition = new Position('A', 4);
    expect(pieceToPlay.canMoveTo(proposedPosition)).to.equal(true);
  });
  it('makeTurn invokes a isTurn that allows makeTurn to return an error if the proposed move is not acceptable for the piece', () => {
    const newGame = new Game();
    const errorMessage: MessageType = newGame.makeTurn('A', 2, 'A', 5);
    expect(errorMessage.msg).to.equal('invalid move!');
  });
  it('has a isPosition clear method that returns a boolean dependant on whether there is another piece in the proposed position', () => {
    const newGame = new Game();
    const isClear = newGame.isPositionClear('A', 5);
    expect(isClear).to.equal(true);
  });
  it("makeTurn returns an error when there is one of the player's own pieces in the proposed position", () => {
    const newGame = new Game();
    const errorMessage: MessageType = newGame.makeTurn('D', 1, 'D', 2);
    expect(errorMessage.msg).to.equal(
      'Do you really want to take your own piece?'
    );
  });
  it('makeTurn removed a captured piece from the array of pieces in play', () => {
    const newGame = new Game();
    newGame.makeTurn('D', 1, 'D', 7);
    const piecesInPlay = newGame.getAllPieces();
    expect(piecesInPlay.length).to.equal(31);
  });
  it('makeTurn updates the position of the piece in play and updates the piecesInPlay accordingly', () => {
    const newGame = new Game();
    newGame.makeTurn('D', 1, 'D', 7);
    const pieceInPlay = newGame.getPiece('D', 1);
    expect(pieceInPlay).to.equal(undefined);
  });
  it('makeTurn flips the turn ready for the next player to go', () => {
    const newGame = new Game();
    newGame.makeTurn('D', 1, 'D', 7);
    expect(newGame.isTurn('white')).to.equal(false);
    expect(newGame.isTurn('black')).to.equal(true);
  });
  it('makeTurn returns a success message when the move has been accepted', () => {
    const newGame = new Game();
    const successMessage: MessageType = newGame.makeTurn('D', 1, 'D', 7);
    expect(successMessage.msg).to.equal('Piece moved to new position');
  });
  it('has isInCheck method that returns false when the king is in not check', () => {
    const newGame = new Game();
    const isCheck = newGame.isInCheck('white');
    expect(isCheck).to.equal(false);
  });
  it('returns true when the king is in check', () => {
    const newGame = new Game();
    let isCheck = newGame.isInCheck('white');
    expect(isCheck).to.equal(false);
    isCheck = newGame.isInCheck('black');
    expect(isCheck).to.equal(false);
    newGame.makeTurn('F', 2, 'F', 3); // white turn
    isCheck = newGame.isInCheck('black');
    expect(isCheck).to.equal(false);
    isCheck = newGame.isInCheck('white');
    expect(isCheck).to.equal(false);
    newGame.makeTurn('E', 7, 'E', 5); // black turn
    isCheck = newGame.isInCheck('white');
    expect(isCheck).to.equal(false);
    isCheck = newGame.isInCheck('black');
    expect(isCheck).to.equal(false);
    newGame.makeTurn('G', 2, 'G', 4); // white turn
    isCheck = newGame.isInCheck('black');
    expect(isCheck).to.equal(false);
    isCheck = newGame.isInCheck('white');
    expect(isCheck).to.equal(false);
    newGame.makeTurn('D', 8, 'H', 4); // black turn
    isCheck = newGame.isInCheck('white');
    expect(isCheck).to.equal(true);
    isCheck = newGame.isInCheck('black');
    expect(isCheck).to.equal(false);
  });
  it('make turn invokes isCheck method that returns a message saying that the opponent is in check when true', () => {
    const newGame = new Game();
    newGame.makeTurn('F', 2, 'F', 3); // white turn
    newGame.makeTurn('E', 7, 'E', 5); // black turn
    newGame.makeTurn('G', 2, 'G', 4); // white turn
    const successMessage: MessageType = newGame.makeTurn('D', 8, 'H', 4); // black turn
    expect(successMessage.checkStatus).to.equal('white king in check');
  });
  it('make turn invokes isCheck and returns an invalid move message should you try to put yourself in check', () => {
    const newGame = new Game();
    const whiteKing = new King('D', 1, 'white');
    const whiteRook = new Rook('D', 2, 'white');
    const blackRook = new Rook('D', 7, 'black');
    const pieces = [whiteKing, whiteRook, blackRook];
    newGame.clearGameAndPutPiecesInPlay(pieces);
    const invalidMove: MessageType = newGame.makeTurn('D', 2, 'F', 2);
    expect(invalidMove.msg).to.equal(
      "Invalid move, can't put yourself in check"
    );
  });
  it('make turn allows a pawn to move on the diagonal when capturing another piece', () => {
    const newGame = new Game();
    const pawn1 = new Pawn('D', 3, 'white');
    const pawn2 = new Pawn('E', 4, 'black');

    const pieces = [pawn1, pawn2];
    newGame.clearGameAndPutPiecesInPlay(pieces);
    const successMessage: MessageType = newGame.makeTurn('D', 3, 'E', 4);
    expect(successMessage.msg).to.equal('Piece moved to new position');
  });
  it('only allows the pawn to move one space on the diagonal when capturing', () => {
    const newGame = new Game();
    const pawn1 = new Pawn('D', 3, 'white');
    const pawn2 = new Pawn('F', 5, 'black');
    const pieces = [pawn1, pawn2];
    newGame.clearGameAndPutPiecesInPlay(pieces);
    const invalidMove: MessageType = newGame.makeTurn('D', 3, 'F', 5);
    expect(invalidMove.msg).to.equal('invalid move!');
  });
});
