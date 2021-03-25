import React, {useEffect, useState} from "react";
import {useUser} from "../../contexts/UserDataContext";
import {User} from "../../types/User";
import {firestore} from "../../config/firebase";
import { Container, Text, Button } from "@chakra-ui/react";
import {useAuth} from "../../contexts/AuthContext";
import CreateUserForm from "../form/CreateUserForm";
import UserCard from "../UserCard";

const Home: React.FC = (props) => {
    const [users, setUsers] = useState<User[]>([]);
    const {logout} = useAuth()!;
    const user = useUser()!;

    useEffect(() => {

        const unsubscribe = firestore.collection('users').onSnapshot(snapshot => {
            const newUsers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(newUsers as unknown as User[]);
        });

        return () => {
            unsubscribe()
        };

    }, []);


    return <Container>
        <Text textAlign='center' fontSize="3xl">Hello {user.name}</Text>
        {user.role === 'admin' && <CreateUserForm/>}

        {users.length === 0 && <Text>No users to display </Text>}
        {users.map((user, i: number) => <UserCard key={i} {...user}/>)}

        <Button onClick={() => logout()}>Log out!</Button>

    </Container>;
};

export default Home;