import React, { useState } from 'react';
import { Button, Box, Text, HStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import CustomTextInput from '../form/fields/CustomTextInput';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import CustomAlert from '../CustomAlert';
import useResetForm from '../form/useResetForm';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const methods = useForm<LoginFormData>();
  useResetForm(methods.reset, methods.clearErrors);

  const history = useHistory();
  const { login } = useAuth()!;

  async function onSubmit({ email, password }: LoginFormData) {
    setErrorMessage(null);
    setIsLoading(true);

    try {
      await login(email, password);

      history.push('/');
    } catch (e) {
      setErrorMessage(e.message);
    }
    setIsLoading(false);
  }

  const displayErrorMessage = errorMessage !== null && <CustomAlert message={errorMessage!} />;

  return (
    <FormProvider {...methods}>
      <Box w="100%" maxW="500px" m="auto" mt={10}>
        <Box border="1px solid lightgray" borderRadius={4} p={4}>
          <Text fontSize="3xl" textAlign={'center'} fontWeight={'bold'} mb={2}>
            Login
          </Text>
          {displayErrorMessage}
          <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            <Button
              mt={1}
              mr={2}
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
          <Box>Don't have an account?</Box>
          <Box color="blue">
            <Link to={'/register'}>Sign up</Link>
          </Box>
        </HStack>
      </Box>
    </FormProvider>
  );
};

export default Login;
