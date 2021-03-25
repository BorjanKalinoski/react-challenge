import React, {createContext, useContext, useEffect, useState} from "react";
import {auth, firestore} from "../config/firebase";
import {User} from "../types/User";
import firebase from "firebase";

type AuthContextType = {
    currentUser: firebase.User | null;
    signup: (user: User) => Promise<void>
    login: (user: User) => Promise<void>

};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState< firebase.User | null>(null);
    const [loading, setLoading] = useState(true)

    async function signup(user: User): Promise<any> {
        return auth.createUserWithEmailAndPassword(user.email, user.password!).then(response => {
            const uid = response.user?.uid;
            return firestore.collection('users').doc(uid).set({
                email: user.email,
                name: user.name,
                role: user.role
            });
        });
    }

    async function login(user: User): Promise<any> {
        return auth.signInWithEmailAndPassword(user.email, user.password!);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
                setCurrentUser(user);
                setLoading(false);
        });
        return unsubscribe;
    }, []);


    const value = {
        currentUser,
        login,
        signup,
    };


    return <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;