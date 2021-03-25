import React, {createContext, useContext, useEffect, useState} from "react";
import {firestore} from "../config/firebase";
import {useAuth} from "./AuthContext";
import {User} from "../types/User";

const UserDataContext = createContext<User | null>(null);

const UserDataProvider: React.FC = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState<User | null>(null);
    const {currentUser} = useAuth()!;

    //fetch data for the logged in user from firestore
    useEffect(() => {
        const uid = currentUser?.uid;

        firestore.collection('users').doc(uid).get()
            .then((doc => {
                if (doc.exists) {
                    setUserData(doc.data() as User);
                }
            }))
            .catch(e => setUserData(null))
            .finally(() => setIsLoading(false));

    }, [currentUser]);

    return <UserDataContext.Provider value={userData}>
        {!isLoading && children}
    </UserDataContext.Provider>;
};


export const useUser = () => useContext(UserDataContext);

export default UserDataProvider;