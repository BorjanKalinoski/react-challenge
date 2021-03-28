import React from 'react';
import { Button, Flex, Text, HStack, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import { useUserData } from '../contexts/UserDataContext';

const Header: React.FC = (props) => {
  const { signOut } = useAuth()!;
  const { currentUser } = useUserData()!;
  const history = useHistory();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      w="100%"
      justify="space-between"
      py={3}
      px={'20%'}
      align="center"
      borderBottom={'0.5px solid rgba(0,0,0,0.35)'}
    >
      <Text textAlign="center" fontSize="2xl" fontWeight="semibold">
        Welcome back, {currentUser?.name}
      </Text>
      <HStack>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Button color={colorMode === 'light' ? 'black' : 'white'} onClick={() => signOut()}>
          Sign out
        </Button>
      </HStack>
    </Flex>
  );
};
export default Header;
