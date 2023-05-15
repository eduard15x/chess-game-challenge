import wKing from "../assets/chess-pieces-images/wKing.png";
import wQueen from "../assets/chess-pieces-images/wQueen.png";
import wRook from "../assets/chess-pieces-images/wRook.png";
import wBishop from "../assets/chess-pieces-images/wBishop.png";
import wKnight from "../assets/chess-pieces-images/wKnight.png";
import wPawn from "../assets/chess-pieces-images/wPawn.png";

export const WhitePlayer = {
  name: "White Player",
  turnToMove: true,
  pieces: [
    {
      name: "White King",
      imageSrc: wKing,
      position: "e1",
      numericPosition: 4,
      alive: true,
    },
    {
      name: "White Queen",
      imageSrc: wQueen,
      position: "d1",
      numericPosition: 5,
      alive: true,
    },
    {
      name: "White Rook 1",
      imageSrc: wRook,
      position: "a1",
      numericPosition: 1,
      alive: true,
    },
    {
      name: "White Rook 2",
      imageSrc: wRook,
      position: "h1",
      numericPosition: 8,
      alive: true,
    },
    {
      name: "White Bishop 1",
      imageSrc: wBishop,
      position: "c1",
      numericPosition: 3,
      alive: true,
    },
    {
      name: "White Bishop 2",
      imageSrc: wBishop,
      position: "f1",
      numericPosition: 6,
      alive: true,
    },
    {
      name: "White Knight 1",
      imageSrc: wKnight,
      position: "b1",
      numericPosition: 2,
      alive: true,
    },
    {
      name: "White Knight 2",
      imageSrc: wKnight,
      position: "g1",
      numericPosition: 7,
      alive: true,
    },
    {
      name: "White Pawn 1",
      imageSrc: wPawn,
      position: "a2",
      numericPosition: 9,
      alive: true,
    },
    {
      name: "White Pawn 2",
      imageSrc: wPawn,
      position: "b2",
      numericPosition: 10,
      alive: true,
    },
    {
      name: "White Pawn 3",
      imageSrc: wPawn,
      position: "c2",
      numericPosition: 11,
      alive: true,
    },
    {
      name: "White Pawn 4",
      imageSrc: wPawn,
      position: "d2",
      numericPosition: 12,
      alive: true,
    },
    {
      name: "White Pawn 5",
      imageSrc: wPawn,
      position: "e2",
      numericPosition: 13,
      alive: true,
    },
    {
      name: "White Pawn 6",
      imageSrc: wPawn,
      position: "f2",
      numericPosition: 14,
      alive: true,
    },
    {
      name: "White Pawn 7",
      imageSrc: wPawn,
      position: "g2",
      numericPosition: 15,
      alive: true,
    },
    {
      name: "White Pawn 8",
      imageSrc: wPawn,
      position: "h2",
      numericPosition: 16,
      alive: true,
    },
  ],
};
