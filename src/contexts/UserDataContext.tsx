import React, {createContext, useContext, useEffect} from "react";
import {firestore} from "../config/firebase";
import {useAuth} from "./AuthContext";
import {User} from "../types/User";

const UserDataContext = createContext<User | null>(null);

const UserDataProvider: React.FC = ({children}) => {
    const [userData, setUserData] = React.useState<User | null>(null);
    const {currentUser} = useAuth()!;

    useEffect(() => {

        const fetchUserData = async () => {
            const uid = currentUser?.uid;
            try {
                const doc = await firestore.collection('users').doc(uid).get();
                if (doc.exists) {
                    setUserData(doc.data() as User);
                }
            } catch (e) {
                setUserData(null);
            }
        };

        fetchUserData();

    }, [currentUser]);

    return <UserDataContext.Provider value={userData}>{children}</UserDataContext.Provider>;
};


export const useUser = () => useContext(UserDataContext);

export default UserDataProvider;