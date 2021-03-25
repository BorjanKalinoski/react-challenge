import firebase from "firebase";

export interface User {
    name: string;
    email: string;
    password?: string;
    createdAt?: firebase.firestore.Timestamp;
    role: UserRole;
}

export type UserRole = 'admin' | 'moderator';