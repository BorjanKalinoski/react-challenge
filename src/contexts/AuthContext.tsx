import React, { createContext, useContext, useEffect, useState } from 'react';
import { firestore } from '../config/firebase';

interface AuthUserData {
  id: string;
}

type AuthContextType = {
  // authUserData: User | null;
  authUserData: AuthUserData | null;

  isLoadingUser: boolean;

  login: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [authUserData, setAuthUserData] = useState<AuthUserData | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const authUserDataStorageRef = 'authUserData';

  async function login(email: string, password: string) {
    const snapshot = await firestore
      .collection('users')
      .where('email', '==', email)
      .where('password', '==', password)
      .get();

    if (snapshot.size !== 1) {
      throw new Error('Invalid credentials or the user does not exist');
    }

    const authUserData = {
      id: snapshot.docs[0].id,
    };

    localStorage.setItem(authUserDataStorageRef, JSON.stringify(authUserData));

    setAuthUserData(authUserData);
    setIsLoadingUser(false);
  }

  async function signOut(): Promise<void> {
    localStorage.removeItem(authUserDataStorageRef);
    setAuthUserData(null);
  }

  useEffect(() => {
    const data = localStorage.getItem(authUserDataStorageRef);

    if (data) {
      setAuthUserData(JSON.parse(data));
    }

    setIsLoadingUser(false);
  }, []);

  const value = {
    authUserData,
    isLoadingUser,
    login,
    signOut,
  };

  return <AuthContext.Provider value={value}>{!isLoadingUser && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
