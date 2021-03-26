import firebase from 'firebase';

export interface User {
  name: string;
  email: string;
  password?: string;
  createdAt: firebase.firestore.Timestamp;
  role: UserRole;
  id: string;
}

export type UserRole = 'admin' | 'moderator' | 'regular';
