import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { winningCombinations } from "./constants";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import { Room } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function checkWinner(
  tiles: ("cross" | "circle" | null)[],
  playerTurn: "cross" | "circle"
): {
  match: boolean;
  combo?: number[];
  strikeClass?: string | null;
  draw?: boolean;
} | null {
  for (const { combo, strikeClass } of winningCombinations) {
    const match = combo.every((index) => tiles[index] === playerTurn);
    if (match) {
      return {
        match,
        strikeClass,
        combo,
        draw: false,
      };
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    return {
      match: false,
      strikeClass: "",
      draw: true,
    };
  }
  return null;
}


export const roomConverter: FirestoreDataConverter<Room> = {
  toFirestore(room: WithFieldValue<Room>): DocumentData {
    return room;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Room {
    const data = snapshot.data(options);
    return {
      name: data.name,
      id: snapshot.id,
      ref: snapshot.ref,
      players: data.players,
      creator: data.creator,
      isActive: data.isActive,
      createdAt: data.createdAt,
    };
  },
};

export const getRoomLink = (roomId: string) => `https://codeoven-tic-tac-toe.netlify.app/room/${roomId}`;