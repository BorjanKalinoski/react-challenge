import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, UserCredential, FirebaseUser } from '../config/firebase';

type AuthContextType = {
  userAuthData: FirebaseUser | null;
  signup: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [userAuthData, setUserAuthData] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  async function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function logout(): Promise<void> {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserAuthData(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const value = {
    userAuthData,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
