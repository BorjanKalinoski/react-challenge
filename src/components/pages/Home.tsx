import React, { useEffect, useState } from 'react';
import { Container, Text, Button, VStack, Spinner, useDisclosure } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';
import { firestore } from '../../config/firebase';
import { useUserData } from '../../contexts/UserDataContext';
import { User } from '../../types/User';
import UserCard from '../user/UserCard';
import CreateUserModalForm from '../form/modals/CreateUserModalForm';

const Home: React.FC = (props) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { logout } = useAuth()!;

  const { currentUser, isLoadingUser, canCreateUsers } = useUserData()!;

  useEffect(() => {
    firestore.collection('users').onSnapshot((snapshot) => {
      const newUsers: User[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as User),
      }));
      setAllUsers(newUsers);
    });
  }, []);

  if (isLoadingUser || !currentUser) {
    return (
      <Container textAlign={'center'} mt={10}>
        <VStack>
          <span>Loading user data</span>
          <Spinner />
        </VStack>
      </Container>
    );
  }

  const otherUsers = allUsers.filter((otherUser) => otherUser.id !== currentUser.id);

  return (
    <Container textAlign="center">
      <VStack>
        <Text textAlign="center" fontSize="3xl">
          Hello {currentUser?.name}
        </Text>

        {otherUsers.length === 0 && <Text>There are no users to display.. Create some!</Text>}
        {otherUsers.map((user) => (
          <UserCard key={user.id!} id={user.id!} {...user} />
        ))}
        {canCreateUsers() && (
          <>
            <Button onClick={onOpen}>Create a new user</Button>
            <CreateUserModalForm onClose={onClose} isOpen={isOpen} />
          </>
        )}
        <Button onClick={() => logout()}>Log out!</Button>
      </VStack>
    </Container>
  );
};

export default Home;
