import React from 'react';
import firebase from 'firebase';
import { Text, VStack, HStack, useDisclosure, useColorMode } from '@chakra-ui/react';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
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
  const { deleteUser, canDelete, canEdit } = useUserData()!;
  const { isOpen, onOpen, onClose } = useDisclosure(); // hook for modal dialog
  const { colorMode } = useColorMode();

  const displayDate = `${createdAt
    ?.toDate()
    .toLocaleTimeString()} ${createdAt?.toDate().toLocaleDateString()}`;

  return (
    <VStack
      w="100%"
      border="1px solid gray"
      borderRadius={2}
      mb={1}
      p={1}
      position="relative"
      shadow={'md'}
    >
      <HStack>
        {!role ? (
          <Text as="span">
            <Text as="span" fontWeight="semibold">
              {name}
            </Text>{' '}
            has no role :(
          </Text>
        ) : (
          <Text as="span">
            <Text as="span" fontWeight="semibold">
              {name}
            </Text>{' '}
            is a{' '}
            <Text
              as="span"
              color={colorMode === 'light' ? 'red.600' : '#eebe60'}
              fontWeight="semibold"
            >
              {role}
            </Text>
          </Text>
        )}
      </HStack>
      <Text as="span">Created at: {displayDate}</Text>
      <Text as="i">{email}</Text>
      {canDelete() && (
        <CloseIcon
          cursor="pointer"
          color={colorMode === 'light' ? 'red.600' : 'red.400'}
          position="absolute"
          top="0"
          right="2"
          onClick={() => deleteUser(id!)}
        />
      )}
      {canEdit() && (
        <EditIcon
          cursor="pointer"
          color={colorMode === 'light' ? 'blue.400' : 'blue.600'}
          position="absolute"
          bottom="2"
          right="2"
          onClick={onOpen}
        />
      )}
      {canEdit() && (
        <EditUserModalForm onClose={onClose} isOpen={isOpen} values={{ name, email, role, id }} />
      )}
    </VStack>
  );
};

export default UserCard;
