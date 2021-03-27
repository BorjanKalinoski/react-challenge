import React from 'react';
import firebase from 'firebase';
import { Text, VStack, HStack, useDisclosure, useColorMode, Flex } from '@chakra-ui/react';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import { FaUserCircle } from 'react-icons/fa';
import { useUserData } from '../../contexts/UserDataContext';
import EditUserModalForm from '../form/modals/EditUserModalForm';
import { UserRoles } from '../../types/User';

interface Props {
  name: string;
  email: string;
  role: UserRoles;
  createdAt?: firebase.firestore.Timestamp;
  id: string;
}

const UserCard: React.FC<Props> = (props) => {
  const { name, email, role, createdAt, id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure(); // hook for modal dialog
  const { colorMode } = useColorMode();

  const { deleteUser, canDelete, canEdit } = useUserData()!;

  const displayDate = dayjs(createdAt?.toDate()).format('DD/MM/YYYY HH:MM');
  const valueFont = 'bold';

  return (
    <VStack
      p={3}
      mb={2}
      w="50%"
      border="1px solid lightgray"
      borderRadius={4}
      shadow="lg"
      position="relative"
    >
      <Flex mb={0} pb={2} w="100%" justify="center" borderBottom="1px solid gray">
        <FaUserCircle fontSize={60} />
      </Flex>
      <HStack w="100%" justify="flex-start">
        <VStack w="100%" align="flex-start">
          <HStack>
            <Text>Name: </Text>
            <Text fontWeight={valueFont}>{name}</Text>
          </HStack>
          <HStack>
            <Text>Role: </Text>
            <Text color={colorMode === 'light' ? 'cyan.800' : '#eebe60'} fontWeight={valueFont}>
              {role}
            </Text>
          </HStack>
          <HStack>
            <Text>Email: </Text>
            <Text fontWeight={valueFont}>{email}</Text>
          </HStack>
          <HStack>
            <Text>Joined: </Text>
            <Text fontWeight={valueFont}>{displayDate}</Text>
          </HStack>
        </VStack>
      </HStack>
      {canDelete() && (
        <CloseIcon
          cursor="pointer"
          color={colorMode === 'light' ? 'red.600' : 'red.400'}
          position="absolute"
          top="2"
          right="3"
          onClick={() => deleteUser(id!)}
        />
      )}
      {canEdit() && (
        <>
          <EditIcon
            cursor="pointer"
            color={colorMode === 'light' ? 'blue.400' : 'blue.600'}
            position="absolute"
            top="2"
            left="3"
            onClick={onOpen}
          />
          <EditUserModalForm onClose={onClose} isOpen={isOpen} values={{ name, email, role, id }} />
        </>
      )}
    </VStack>
  );
};

export default UserCard;
