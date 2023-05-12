import bKing from "../assets/chess-pieces-images/bKing.png";
import bQueen from "../assets/chess-pieces-images/bQueen.png";
import bRook from "../assets/chess-pieces-images/bRook.png";
import bBishop from "../assets/chess-pieces-images/bBishop.png";
import bKnight from "../assets/chess-pieces-images/bKnight.png";
import bPawn from "../assets/chess-pieces-images/bPawn.png";

export const BlackPlayer = {
  turnToMove: false,
  pieces: [
    {
      name: "Black King",
      imageSrc: bKing,
      position: "e8",
      alive: true,
    },
    {
      name: "Black Queen",
      imageSrc: bQueen,
      position: "d8",
      alive: true,
    },
    {
      name: "Black Rook 1",
      imageSrc: bRook,
      position: "a8",
      alive: true,
    },
    {
      name: "Black Rook 2",
      imageSrc: bRook,
      position: "h8",
      alive: true,
    },
    {
      name: "Black Bishop 1",
      imageSrc: bBishop,
      position: "c8",
      alive: true,
    },
    {
      name: "Black Bishop 2",
      imageSrc: bBishop,
      position: "f8",
      alive: true,
    },
    {
      name: "Black Knight 1",
      imageSrc: bKnight,
      position: "b8",
      alive: true,
    },
    {
      name: "Black Knight 2",
      imageSrc: bKnight,
      position: "g8",
      alive: true,
    },
    {
      name: "Black Pawn 1",
      imageSrc: bPawn,
      position: "a7",
      alive: true,
    },
    {
      name: "Black Pawn 2",
      imageSrc: bPawn,
      position: "b7",
      alive: true,
    },
    {
      name: "Black Pawn 3",
      imageSrc: bPawn,
      position: "c7",
      alive: true,
    },
    {
      name: "Black Pawn 4",
      imageSrc: bPawn,
      position: "d7",
      alive: true,
    },
    {
      name: "Black Pawn 5",
      imageSrc: bPawn,
      position: "e7",
      alive: true,
    },
    {
      name: "Black Pawn 6",
      imageSrc: bPawn,
      position: "f7",
      alive: true,
    },
    {
      name: "Black Pawn 7",
      imageSrc: bPawn,
      position: "g7",
      alive: true,
    },
    {
      name: "Black Pawn 8",
      imageSrc: bPawn,
      position: "h7",
      alive: true,
    },
  ],
};
