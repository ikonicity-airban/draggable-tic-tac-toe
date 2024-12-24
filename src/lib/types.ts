import { DocumentData, Timestamp } from "firebase/firestore";

export type Room = {
    id: string;
    name: string;
    players: Player[];
    creator: string;
    isActive: boolean;
    createdAt: Timestamp;
} | DocumentData;

export type Player = {
    id: string;
    displayName: string;
    photoURL?: string;
    isActive: boolean;
    createdAt: Timestamp;
    tile?: "cross" | "circle";
    score: number;
}