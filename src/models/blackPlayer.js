import bKing from "../assets/chess-pieces-images/bKing.png";
import bQueen from "../assets/chess-pieces-images/bQueen.png";
import bRook from "../assets/chess-pieces-images/bRook.png";
import bBishop from "../assets/chess-pieces-images/bBishop.png";
import bKnight from "../assets/chess-pieces-images/bKnight.png";
import bPawn from "../assets/chess-pieces-images/bPawn.png";

export const BlackPlayer = {
  name: "Black Player",
  turnToMove: false,
  pieces: [
    {
      name: "Black King",
      imageSrc: bKing,
      position: "e8",
      numericPosition: 60,
      alive: true,
    },
    {
      name: "Black Queen",
      imageSrc: bQueen,
      position: "d8",
      numericPosition: 61,
      alive: true,
    },
    {
      name: "Black Rook 1",
      imageSrc: bRook,
      position: "a8",
      numericPosition: 57,
      alive: true,
    },
    {
      name: "Black Rook 2",
      imageSrc: bRook,
      position: "h8",
      numericPosition: 64,
      alive: true,
    },
    {
      name: "Black Bishop 1",
      imageSrc: bBishop,
      position: "c8",
      numericPosition: 59,
      alive: true,
    },
    {
      name: "Black Bishop 2",
      imageSrc: bBishop,
      position: "f8",
      numericPosition: 62,
      alive: true,
    },
    {
      name: "Black Knight 1",
      imageSrc: bKnight,
      position: "b8",
      numericPosition: 58,
      alive: true,
    },
    {
      name: "Black Knight 2",
      imageSrc: bKnight,
      position: "g8",
      numericPosition: 63,
      alive: true,
    },
    {
      name: "Black Pawn 1",
      imageSrc: bPawn,
      position: "a7",
      numericPosition: 49,
      alive: true,
    },
    {
      name: "Black Pawn 2",
      imageSrc: bPawn,
      position: "b7",
      numericPosition: 50,
      alive: true,
    },
    {
      name: "Black Pawn 3",
      imageSrc: bPawn,
      position: "c7",
      numericPosition: 51,
      alive: true,
    },
    {
      name: "Black Pawn 4",
      imageSrc: bPawn,
      position: "d7",
      numericPosition: 52,
      alive: true,
    },
    {
      name: "Black Pawn 5",
      imageSrc: bPawn,
      position: "e7",
      numericPosition: 53,
      alive: true,
    },
    {
      name: "Black Pawn 6",
      imageSrc: bPawn,
      position: "f7",
      numericPosition: 54,
      alive: true,
    },
    {
      name: "Black Pawn 7",
      imageSrc: bPawn,
      position: "g7",
      numericPosition: 55,
      alive: true,
    },
    {
      name: "Black Pawn 8",
      imageSrc: bPawn,
      position: "h7",
      numericPosition: 56,
      alive: true,
    },
  ],
};
