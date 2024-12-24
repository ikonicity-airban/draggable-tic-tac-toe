import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { winningCombinations } from "./constants";
import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  where,
  WithFieldValue,
} from "firebase/firestore";
import { Player, Room } from "./types";
import { db } from "./firebase";

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

export const playerConverter: FirestoreDataConverter<Player> = {
  toFirestore(player: WithFieldValue<Player>): DocumentData {
    return player;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Player {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      displayName: data.displayName,
      photoURL: data.photoURL,
      isActive: data.isActive,
      createdAt: data.createdAt,
      score: data.score,
    };
  },
};

export const getRoomLink = (roomId: string) => `https://codeoven-tic-tac-toe.netlify.app/room/${roomId}`;

export const getUserPlayer = (players: Player[], userId?: string) => {
  return players.find((player) => player.id === userId);
};

export const getOpponentPlayer = (players: Player[], userId?: string) => {
  return players.find((player) => player.id !== userId);
};


async function fetchDocumentsByIds(id1: string, id2: string) {
  const q = query(
    collection(db, "collectionName"),
    where("__name__", "in", [id1, id2])
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
}

// Example usage
fetchDocumentsByIds("documentId1", "documentId2");
