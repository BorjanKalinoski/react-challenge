import React, {createContext, useContext, useEffect, useState} from "react";
import {firestore} from "../config/firebase";
import {useAuth} from "./AuthContext";
import {User} from "../types/User";

type UserContextType = {
    user: User | null;
    isUserLoading: boolean;
    deleteUser: (id: string) => Promise<void>;
    canCreateUsers: () => boolean;
    canAssignRoles: () => boolean;
    canDelete: () => boolean;
    canEdit: () => boolean;
};

const UserContext = createContext<UserContextType | null>(null);

const UserProvider: React.FC = ({children}) => {
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const {currentUser} = useAuth()!;

    //fetch data for the logged in user from firestore
    useEffect(() => {
        const uid = currentUser?.uid;

        firestore.collection('users').doc(uid).get()
            .then((doc => {
                if (doc.exists) {
                    setUser({
                        id: doc.id,
                        ...doc.data() as User
                    });
                }
            }))
            .catch(e => setUser(null))
            .finally(() => setIsUserLoading(false));

    }, [currentUser]);


    async function deleteUser(id: string): Promise<void> {
        return firestore.collection('users').doc(id).delete();
    }

    function canCreateUsers(): boolean {
        return user?.role === 'admin' || user?.role === 'moderator';
    }

    function canAssignRoles(): boolean {
        return user?.role === 'admin' ;
    }

    function canDelete(): boolean {
        return user?.role === 'admin' ;
    }

    function canEdit(): boolean {
        return user?.role === 'admin' || user?.role === 'moderator';
    }

    const value = {
        user,
        isUserLoading,
        deleteUser,
        canCreateUsers,
        canAssignRoles,
        canDelete,
        canEdit
    };

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>;
};


export const useUser = () => useContext(UserContext);

export default UserProvider;