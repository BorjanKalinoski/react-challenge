import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import firebase from 'firebase';
import { DocumentSnapshot, firestore } from '../config/firebase';
import { User, UserRoles } from '../types/User';
import { useAuth } from './AuthContext';

type UserDataContextType = {
  currentUser: User | null;
  isLoadingUser: boolean;

  //User CRUD
  fetchUser: (id: string) => Promise<DocumentSnapshot>;
  deleteUser: (id: string) => Promise<void>;
  editUser: (user: User, id: string) => Promise<void>;
  createUser: (user: User) => Promise<void>;

  //User permissions
  canDelete: () => boolean;
  canEdit: () => boolean;
  canAssignRoles: () => boolean;
  canCreateUsers: () => boolean;
};

const UserDataContext = createContext<UserDataContextType | null>(null);

const UserDataProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { authUserData } = useAuth()!;

  //fetch the logged in user data from firestore
  useEffect(() => {
    const id = authUserData?.id;

    if (id !== undefined) {
      fetchUser(id)
        .then((doc) => {
          if (doc.exists) {
            setCurrentUser({
              ...(doc.data() as User),
              id: doc.id,
            });
          }
        })
        .finally(() => setIsLoadingUser(false));
    }
  }, [authUserData]);

  ///////////////////
  //USER CRUD OPERATIONS
  ///////////////////
  async function fetchUser(id: string) {
    return firestore.collection('users').doc(id).get();
  }

  async function deleteUser(id: string) {
    return firestore.collection('users').doc(id).delete();
  }

  async function editUser(userData: User, id: string) {
    // make sure the new email does not exists on other accounts

    const snapshot = await firestore
      .collection('users')
      .where('email', '==', userData.email)
      .where('id', '!=', id)
      .get();

    if (snapshot.size >= 1) {
      throw new Error('User with the same email address already exists');
    }

    return firestore.collection('users').doc(id).set(userData, {
      merge: true,
    });
  }

  async function createUser(userData: User) {
    const snapshot = await firestore.collection('users').where('email', '==', userData.email).get();

    if (snapshot.size !== 0) {
      throw new Error('User with the same email address already exists');
    }

    const nextDocumentRef = firestore.collection('users').doc();

    return nextDocumentRef.set({
      ...userData,
      id: nextDocumentRef.id,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    });
  }

  ///////////////////
  //USER PERMISSIONS
  ///////////////////

  function canDelete(): boolean {
    return currentUser?.role === UserRoles.Admin;
  }

  function canEdit(): boolean {
    return currentUser?.role === UserRoles.Admin || currentUser?.role === UserRoles.Moderator;
  }

  function canAssignRoles(): boolean {
    return currentUser?.role === UserRoles.Admin;
  }

  function canCreateUsers(): boolean {
    return currentUser?.role === UserRoles.Admin || currentUser?.role === UserRoles.Moderator;
  }

  const value = {
    currentUser,
    isLoadingUser,
    fetchUser,
    deleteUser,
    editUser,
    createUser,
    canDelete,
    canEdit,
    canAssignRoles,
    canCreateUsers,
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};

export const useUserData = () => useContext(UserDataContext);

export default UserDataProvider;
