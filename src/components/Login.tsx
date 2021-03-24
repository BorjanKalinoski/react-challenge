import React, {useState} from "react";
import {Button, Box, Text, HStack} from "@chakra-ui/react";
import {FormProvider, useForm} from "react-hook-form";
import {User} from "../types/User";
import CustomTextInput from "./form/CustomTextInput";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const Login: React.FC = (props) => {
    const methods = useForm<User>();
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const {login} = useAuth()!;

    async function onSubmit(user: User) {

        setIsLoading(true);
        try {
            await login(user);
            history.push('/');
            console.log('mine')
        }catch (e) {
            alert('wa!');
        }
        setIsLoading(false);

    }

    return (
        <FormProvider {...methods}>
            <Box w='100%' maxW='400px' m='auto' mt={10}>
                <Box border='1px solid lightgray' borderRadius={4} p={4}>
                    <Text fontSize='3xl' textAlign={'center'} fontWeight={'bold'} mb={2}>
                        Login
                    </Text>
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