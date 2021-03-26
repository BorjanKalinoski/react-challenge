import React, { useState } from 'react';
import { Button, Box, Text, HStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { User } from '../../types/User';
import CustomTextInput from '../form/fields/CustomTextInput';
import CustomSelect from '../form/fields/CustomSelect';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CustomAlert from '../CustomAlert';

const Register: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { signup } = useAuth()!;
  const history = useHistory();
  const methods = useForm<User>();

  async function onSubmit(user: User) {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await signup(user);
      history.push('/login');
    } catch (e) {
      setErrorMessage(e.message);
    }
    setIsLoading(false);
  }

  const displayErrorMessage = errorMessage !== null && (
    <CustomAlert>{errorMessage}</CustomAlert>
  );

  return (
    <FormProvider {...methods}>
      <Box w="100%" maxW="400px" m="auto" mt={10}>
        <Box border="1px solid lightgray" borderRadius={4} p={4}>
          <Text fontSize="3xl" textAlign={'center'} fontWeight={'bold'} mb={2}>
            Register
          </Text>
          {displayErrorMessage}
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <CustomTextInput
              required
              name="name"
              label="Name"
              placeholder="Admin Userson"
            />
            <CustomTextInput
              required
              name="email"
              type="email"
              label="Email"
              placeholder="test@example.com"
            />
            <CustomTextInput
              minLength={6}
              required
              name="password"
              label="Password"
              type="password"
            />
            <CustomSelect
              required
              name="role"
              label="Role"
              placeholder="Select a role for the user"
            >
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="regular">Regular</option>
            </CustomSelect>
            <Button
              mt={1}
              colorScheme="teal"
              isLoading={isLoading}
              loadingText={'Submit'}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
        <HStack mt={2} justifyContent={'center'}>
          <Box>Already have an account?</Box>
          <Box color="blue">
            <Link to={'/login'}>Sign in</Link>
          </Box>
        </HStack>
      </Box>
    </FormProvider>
  );
};

export default Register;
