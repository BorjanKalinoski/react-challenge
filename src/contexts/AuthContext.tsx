import React, {createContext, useContext, useEffect, useState} from "react";
import  {auth} from "../config/firebase";
import {User} from "../types/User";

type AuthContextType = {
    currentUser: Object | null; //cannot get Firebase user types
    signup: (user: User) => Promise<void>
    login: (user: User) => Promise<void>

};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState<Object | null>(null);
    const [loading, setLoading] = useState(true)

    async function signup(user: User): Promise<any> {
        return auth.createUserWithEmailAndPassword(user.email, user.password!)
    }

    async function login(user: User): Promise<any> {
        return auth.signInWithEmailAndPassword(user.email, user.password!);
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
            //we want to wait for this event to fire before we render the children in the ContextProvider
        });

        return unsubscribe;
    }, []);



    const value = {
        currentUser,
        signup,
        login
    };


    return <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;