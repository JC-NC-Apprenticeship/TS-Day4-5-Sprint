import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { ColourType, Piece } from './pieces/piece';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';
import { Position, FileType, RankType } from './position';
import { isUndefined } from './utils';

type MessageType = { msg: string; checkStatus?: string };

class Game {
  private pieces = Game.makePieces();
  private currentTurn: ColourType;

  constructor() {
    this.currentTurn = 'white';
  }

  private static makePieces(): Piece[] {
    const startingPieces = [
      //Queens
      new Queen('D', 1, 'white'),
      new Queen('D', 8, 'black'),
      //Kings
      new King('E', 1, 'white'),
      new King('E', 8, 'black'),
      //Bishops
      new Bishop('C', 1, 'white'),
      new Bishop('F', 1, 'white'),
      new Bishop('C', 8, 'black'),
      new Bishop('F', 8, 'black'),
      //Knights
      new Knight('B', 1, 'white'),
      new Knight('G', 1, 'white'),
      new Knight('B', 8, 'black'),
      new Knight('G', 8, 'black'),
      //Rooks
      new Rook('A', 1, 'white'),
      new Rook('H', 1, 'white'),
      new Rook('A', 8, 'black'),
      new Rook('H', 8, 'black'),
      //Pawns
      new Pawn('A', 2, 'white'),
      new Pawn('B', 2, 'white'),
      new Pawn('C', 2, 'white'),
      new Pawn('D', 2, 'white'),
      new Pawn('E', 2, 'white'),
      new Pawn('F', 2, 'white'),
      new Pawn('G', 2, 'white'),
      new Pawn('H', 2, 'white'),
      new Pawn('A', 7, 'black'),
      new Pawn('B', 7, 'black'),
      new Pawn('C', 7, 'black'),
      new Pawn('D', 7, 'black'),
      new Pawn('E', 7, 'black'),
      new Pawn('F', 7, 'black'),
      new Pawn('G', 7, 'black'),
      new Pawn('H', 7, 'black'),
    ];
    return startingPieces;
  }

  makeTurn(
    currentFile: FileType,
    currentRank: RankType,
    proposedFile: FileType,
    proposedRank: RankType
  ): MessageType {
    const pieceInPlay = this.getPiece(currentFile, currentRank);
    const colourOfPieceInPlay = pieceInPlay.getColour();

    if (!this.isTurn(colourOfPieceInPlay)) return { msg: 'not your turn!' };

    const proposedPosition = new Position(proposedFile, proposedRank);

    if (!this.isPositionClear(proposedFile, proposedRank)) {
      if (
        !this.isOpponentsPieceToCapture(
          proposedRank,
          proposedFile,
          colourOfPieceInPlay
        )
      )
        return { msg: 'Do you really want to take your own piece?' };

      if (!pieceInPlay.canMoveTo(proposedPosition, true)) {
        return { msg: 'invalid move!' };
      }

      this.captureOpponentsPiece(proposedFile, proposedRank);
    } else {
      if (!pieceInPlay.canMoveTo(proposedPosition))
        return { msg: 'invalid move!' };
    }

    pieceInPlay.moveTo(proposedPosition);

    const iAmInCheck = this.isInCheck(this.currentTurn);

    if (iAmInCheck) {
      const oldPosition = new Position(currentFile, currentRank);
      pieceInPlay.moveTo(oldPosition);
      return { msg: "Invalid move, can't put yourself in check" };
    }

    this.setTurn();
    const opponentInCheck = this.isInCheck(this.currentTurn);
    if (opponentInCheck)
      return {
        msg: 'Piece moved to new position',
        checkStatus: `${this.currentTurn} king in check`,
      };
    return { msg: 'Piece moved to new position' };
  }

  getPiece(file: FileType, rank: RankType): Piece {
    const allPieces = this.getAllPieces();
    const piecesInPlay: Piece[] = allPieces.filter((piece) => {
      return piece.isInPosition(file, rank);
    });
    return piecesInPlay[0];
  }

  isTurn(pieceColourToCheck: ColourType): boolean {
    return pieceColourToCheck === this.currentTurn;
  }

  getAllPieces(): Piece[] {
    return this.pieces;
  }

  setTurn(): void {
    if (this.currentTurn === 'white') {
      this.currentTurn = 'black';
    } else this.currentTurn = 'white';
  }

  isPositionClear(file: FileType, rank: RankType): boolean {
    const piece = this.getPiece(file, rank);
    if (piece) return false;
    return true;
  }

  isOpponentsPieceToCapture(
    proposedRank: RankType,
    proposedFile: FileType,
    colourOfPieceInPlay: ColourType
  ): boolean {
    const pieceInProposedPosition = this.getPiece(proposedFile, proposedRank);

    if (pieceInProposedPosition.getColour() === colourOfPieceInPlay)
      return false;
    return true;
  }

  captureOpponentsPiece(proposedFile: FileType, proposedRank: RankType): void {
    const pieceInProposedPosition = this.getPiece(proposedFile, proposedRank);

    pieceInProposedPosition.capture();
    this.pieces = this.pieces.filter((piece) => {
      return !piece.isCaptured();
    });
  }

  isInCheck(colour: ColourType) {
    const oppositionPieces = this.pieces.filter((piece) => {
      return piece.getColour() !== colour;
    });

    const king = this.pieces.find((piece) => {
      return piece instanceof King && piece.getColour() === colour;
    });

    return oppositionPieces.some((piece: Piece) => {
      if (!isUndefined(king)) {
        const kingPosition = king.getPosition();
        return piece.canMoveTo(kingPosition);
      } else return true;
    });
  }

  clearGameAndPutPiecesInPlay = (pieces: Piece[]) => {
    this.pieces = pieces;
  };
}

export { Game, MessageType };
