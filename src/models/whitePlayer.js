import wKing from "../assets/chess-pieces-images/wKing.png";
import wQueen from "../assets/chess-pieces-images/wQueen.png";
import wRook from "../assets/chess-pieces-images/wRook.png";
import wBishop from "../assets/chess-pieces-images/wBishop.png";
import wKnight from "../assets/chess-pieces-images/wKnight.png";
import wPawn from "../assets/chess-pieces-images/wPawn.png";

export const WhitePlayer = {
  turnToMove: true,
  pieces: [
    {
      name: "White King",
      imageSrc: wKing,
      position: "e1",
      alive: true,
    },
    {
      name: "White Queen",
      imageSrc: wQueen,
      position: "d1",
      alive: true,
    },
    {
      name: "White Rook 1",
      imageSrc: wRook,
      position: "a1",
      alive: true,
    },
    {
      name: "White Rook 2",
      imageSrc: wRook,
      position: "h1",
      alive: true,
    },
    {
      name: "White Bishop 1",
      imageSrc: wBishop,
      position: "c1",
      alive: true,
    },
    {
      name: "White Bishop 2",
      imageSrc: wBishop,
      position: "f1",
      alive: true,
    },
    {
      name: "White Knight 1",
      imageSrc: wKnight,
      position: "b1",
      alive: true,
    },
    {
      name: "White Knight 2",
      imageSrc: wKnight,
      position: "g1",
      alive: true,
    },
    {
      name: "White Pawn 1",
      imageSrc: wPawn,
      position: "a2",
      alive: true,
    },
    {
      name: "White Pawn 2",
      imageSrc: wPawn,
      position: "b2",
      alive: true,
    },
    {
      name: "White Pawn 3",
      imageSrc: wPawn,
      position: "c2",
      alive: true,
    },
    {
      name: "White Pawn 4",
      imageSrc: wPawn,
      position: "d2",
      alive: true,
    },
    {
      name: "White Pawn 5",
      imageSrc: wPawn,
      position: "e2",
      alive: true,
    },
    {
      name: "White Pawn 6",
      imageSrc: wPawn,
      position: "f2",
      alive: true,
    },
    {
      name: "White Pawn 7",
      imageSrc: wPawn,
      position: "g2",
      alive: true,
    },
    {
      name: "White Pawn 8",
      imageSrc: wPawn,
      position: "h2",
      alive: true,
    },
  ],
};
