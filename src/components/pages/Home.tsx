import React from 'react';
import { Container, Button, VStack, useDisclosure } from '@chakra-ui/react';
import { useUserData } from '../../contexts/UserDataContext';
import CreateUserModalForm from '../form/modals/CreateUserModalForm';
import Header from '../Header';
import UsersList from '../user/UsersList';
import Loading from '../Loading';

const Home: React.FC = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentUser, isLoadingUser, canCreateUsers } = useUserData()!;

  if (isLoadingUser || !currentUser) {
    return <Loading message="Loading user data" />;
  }

  return (
    <>
      <Header />
      <Container textAlign="center" p={1} mt={2}>
        <VStack>
          {canCreateUsers() && (
            <>
              <Button mb={1} onClick={onOpen}>
                Create a new user
              </Button>
              <CreateUserModalForm onClose={onClose} isOpen={isOpen} />
            </>
          )}
          <UsersList />
        </VStack>
      </Container>
    </>
  );
};

export default Home;
