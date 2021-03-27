import React from 'react';
import { Button, Flex, Text, HStack, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useUserData } from '../contexts/UserDataContext';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = (props) => {
  const { currentUser } = useUserData()!;

  const { signOut } = useAuth()!;

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
