import React, {useEffect, useState} from "react";
import {useUser} from "../../contexts/UserContext";
import {User} from "../../types/User";
import {firestore} from "../../config/firebase";
import {
    Container, Text, Button, VStack, Spinner, useDisclosure,
} from "@chakra-ui/react";
import {useAuth} from "../../contexts/AuthContext";
import UserCard from "../UserCard";
import CreateUserModalForm from "../form/CreateUserModalForm";

const Home: React.FC = (props) => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const {logout} = useAuth()!;
    const {user, isUserLoading, canCreateUsers} = useUser()!
    const {isOpen, onOpen, onClose} = useDisclosure();//for create user modal

    useEffect(() => {
        firestore.collection('users').onSnapshot((snapshot) => {
            const newUsers: User[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data() as User
            }));
            setAllUsers(newUsers);
        });

    }, []);


    if (!user || isUserLoading) {
        return <Container textAlign={'center'} mt={10}>
            <VStack>
                <span>
                    Loading user data
                </span>
                <Spinner/>
            </VStack>
        </Container>;
    }

    const otherUsers = allUsers.filter(otherUser => otherUser.id !== user.id);

    return <Container textAlign='center'>
        <VStack>
            <Text textAlign='center' fontSize="3xl">
                Hello {user?.name}
            </Text>

            {otherUsers.length === 0 && <Text>There are no users to display.. Create some!</Text>}
            {otherUsers.map((user) => <UserCard
                key={user.id}
                {...user}
            />)}
            {canCreateUsers() && <>
                <Button onClick={onOpen}>
                    Create a new user
                </Button>
                <CreateUserModalForm onClose={onClose} isOpen={isOpen}/>
            </>}
            <Button onClick={() => logout()}>Log out!</Button>
        </VStack>
    </Container>;
};

export default Home;