import React from 'react';
import { Container, Button, VStack, useDisclosure } from '@chakra-ui/react';
import { useUserData } from '../../contexts/UserDataContext';
import CreateUserModalForm from '../form/modals/CreateUserModalForm';
import Header from '../common/Header';
import Loading from '../common/Loading';
import UsersList from '../user/UsersList';

const Home: React.FC = (props) => {
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure(); //hook for modal dialog (Create new user)

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
              {isModalOpen && <CreateUserModalForm onClose={onClose} isOpen={isModalOpen} />}
            </>
          )}
          <UsersList />
        </VStack>
      </Container>
    </>
  );
};

export default Home;
