import React, {useState} from "react";
import {Button, Box, Text, HStack, AlertIcon, Alert, CloseButton, AlertDescription,  } from "@chakra-ui/react";
import {FormProvider, useForm} from "react-hook-form";
import {User} from "../../types/User";
import CustomTextInput from "../form/CustomTextInput";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";
import CustomAlert from "../form/common/CustomAlert";

const Login: React.FC = (props) => {
    const methods = useForm<User>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const history = useHistory();
    const {login} = useAuth()!;

    async function onSubmit(user: User) {
        setErrorMessage(null);
        setIsLoading(true);

        try {
            await login(user);
            history.push('/');
        }catch (e) {
            setErrorMessage(e.message);
        }
        setIsLoading(false);
    }

    const displayErrorMessage = errorMessage !== null && <CustomAlert>{errorMessage}</CustomAlert>;


    return (
        <FormProvider {...methods}>
            <Box w='100%' maxW='500px' m='auto' mt={10}>
                <Box border='1px solid lightgray' borderRadius={4} p={4}>
                    <Text fontSize='3xl' textAlign={'center'} fontWeight={'bold'} mb={2}>
                        Login
                    </Text>
                    {displayErrorMessage}
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <CustomTextInput
                            required
                            name='email'
                            type='email'
                            label='Email'
                            placeholder='test@example.com'
                        />
                        <CustomTextInput
                            minLength={6}
                            required
                            name='password'
                            label='Password'
                            type='password'
                        />
                        <Button mt={1} colorScheme="teal" isLoading={isLoading} loadingText={'Submit'} type="submit">
                            Submit
                        </Button>
                    </form>
                </Box>
                <HStack mt={2} justifyContent={'center'}>
                    <Box>
                        Don't have an account?
                    </Box>
                    <Box color='blue'>
                        <Link to={'/register'}>
                            Sign up
                        </Link>
                    </Box>
                </HStack>
            </Box>
        </FormProvider>
    );
};

export default Login;