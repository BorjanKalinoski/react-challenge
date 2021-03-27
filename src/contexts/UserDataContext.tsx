import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import { adminAuth, DocumentSnapshot, firestore } from '../config/firebase';
import { useAuth } from './AuthContext';
import { User, UserRoles } from '../types/User';

type UserDataContextType = {
  currentUser: User | null;
  isLoadingUser: boolean;

  //user crud
  fetchUser: (id: string) => Promise<DocumentSnapshot>;
  deleteUser: (id: string) => Promise<void>;
  editUser: (user: User, id: string) => Promise<void>;
  storeUser: (id: string, user: User) => Promise<void>;
  createNewUser: (user: User) => Promise<void>;

  //user permissions
  canDelete: () => boolean;
  canEdit: () => boolean;
  canAssignRoles: () => boolean;
  canCreateUsers: () => boolean;
};

const UserDataContext = createContext<UserDataContextType | null>(null);

const UserDataProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const { userAuthData } = useAuth()!;

  //fetch user data for the currently logged in user
  useEffect(() => {
    const id = userAuthData?.uid;
    if (id !== undefined) {
      fetchUser(id)
        .then((doc) => {
          if (!doc.exists) {
            throw new Error('User not found'); //should not happen, just in case
          }
          setCurrentUser({
            id: doc.id,
            ...(doc.data() as User),
          });
        })
        .catch((e) => setCurrentUser(null))
        .finally(() => setIsLoadingUser(false));
    }
  }, [userAuthData]);

  ///////////////////
  //USER CRUD OPERATIONS
  ///////////////////
  async function fetchUser(id: string) {
    return firestore.collection('users').doc(id).get();
  }

  async function deleteUser(id: string) {
    return firestore.collection('users').doc(id).delete();
  }

  async function editUser(user: User, id: string) {
    return firestore.collection('users').doc(id).set(user, {
      merge: true,
    });
  }

  async function storeUser(id: string, user: User) {
    delete user.password;

    return firestore
      .collection('users')
      .doc(id)
      .set({
        ...user,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      });
  }

  async function createNewUser(user: User) {
    const snapshot = await firestore.collection('users').where('email', '==', user.email).get();

    if (snapshot.size === 1) {
      throw new Error('User already exists!');
    }

    const response = await adminAuth.createUserWithEmailAndPassword(user.email, user.password!);

    delete user.password;

    return storeUser(response.user?.uid!, user);
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
    storeUser,
    createNewUser,
    canDelete,
    canEdit,
    canAssignRoles,
    canCreateUsers,
  };

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};

export const useUserData = () => useContext(UserDataContext);

export default UserDataProvider;
