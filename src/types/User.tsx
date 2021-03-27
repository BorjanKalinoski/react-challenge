import firebase from 'firebase';

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: UserRoles;
  createdAt?: firebase.firestore.Timestamp;
}

export enum UserRoles {
  Admin = 'admin',
  Moderator = 'moderator',
  Regular = 'regular',
}
