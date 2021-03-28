import React from 'react';
import firebase from 'firebase';
import { Text, VStack, HStack, useDisclosure, useColorMode, Flex } from '@chakra-ui/react';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { FaUserCircle } from 'react-icons/fa';
import EditUserModalForm from '../form/modals/EditUserModalForm';
import { UserRoles } from '../../types/User';
import { useUserData } from '../../contexts/UserDataContext';

interface Props {
  name: string;
  email: string;
  role: UserRoles;
  createdAt?: firebase.firestore.Timestamp;
  id: string;
}

const UserCard: React.FC<Props> = (props) => {
  const { name, email, role, createdAt, id } = props;

  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure(); // hook for modal dialog
  const { colorMode } = useColorMode();

  const { deleteUser, canDelete, canEdit } = useUserData()!;

  const valueFontWeight = 'bold';

  const displayDate = createdAt?.toDate().toLocaleString();

  return (
    <VStack
      p={3}
      mb={2}
      w="60%"
      border="1px solid lightgray"
      borderRadius={4}
      shadow="lg"
      position="relative"
      overflow={'auto'}
    >
      <Flex mb={0} pb={3} w="100%" justify="center" borderBottom="1px solid gray">
        <FaUserCircle fontSize={60} />
      </Flex>
      <HStack w="100%" justify="flex-start">
        <VStack w="100%" align="flex-start">
          <HStack>
            <Text>Name: </Text>
            <Text fontWeight={valueFontWeight}>{name}</Text>
          </HStack>
          <HStack>
            <Text>Role: </Text>
            <Text
              color={colorMode === 'light' ? 'cyan.800' : '#eebe60'}
              fontWeight={valueFontWeight}
            >
              {role || 'Viewer'}
            </Text>
          </HStack>
          <HStack>
            <Text>Email: </Text>
            <Text fontWeight={valueFontWeight}>{email}</Text>
          </HStack>
          <HStack>
            <Text>Joined: </Text>
            <Text fontWeight={valueFontWeight}>{displayDate}</Text>
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
          {isModalOpen && (
            <EditUserModalForm
              onClose={onClose}
              isOpen={isModalOpen}
              values={{ name, email, role, id }}
            />
          )}
        </>
      )}
    </VStack>
  );
};

export default UserCard;
