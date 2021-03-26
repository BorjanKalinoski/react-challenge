import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase';
import { auth, firestore } from '../config/firebase';
import { User } from '../types/User';

type AuthContextType = {
  currentUser: firebase.User | null;
  signup: (user: User) => Promise<void>;
  login: (user: User) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(user: User): Promise<void> {
    return auth
      .createUserWithEmailAndPassword(user.email, user.password!)
      .then((response) => {
        const uid = response.user?.uid;
        return firestore
          .collection('users')
          .doc(uid)
          .set({
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          });
      });
  }

  async function login(user: User): Promise<firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(user.email, user.password!);
  }

  async function logout(): Promise<void> {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
