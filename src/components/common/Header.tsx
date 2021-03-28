import React from 'react';
import { Button, Flex, Text, HStack, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useUserData } from '../../contexts/UserDataContext';

const Header: React.FC = (props) => {
  const { signOut } = useAuth()!;
  const { currentUser } = useUserData()!;

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      w="100%"
      direction={{
        base: 'column',
        sm: 'row',
      }}
      justify="space-between"
      align="center"
      py={3}
      px={10}
      borderBottom="0.5px solid rgba(0, 0, 0, 0.35)"
    >
      <Text textAlign="center" fontSize="2xl" fontWeight="semibold">
        Welcome {currentUser?.name}
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
