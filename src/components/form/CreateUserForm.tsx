import React, {useState} from "react";
import {
    Button,
    Box, Text, HStack
} from "@chakra-ui/react";
import CustomTextInput from "./CustomTextInput";
import CustomSelect from "./CustomSelect";
import {FormProvider, useForm} from "react-hook-form";
import {User} from "../../types/User";
import CustomAlert from "../common/CustomAlert";
import { firestore} from "../../config/firebase";

interface Props  {

}


const CreateUserForm: React.FC<Props> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);


    const methods = useForm<User>();

    const onSubmit = async (user: User) => {
        setIsLoading(true);
        setErrorMessage(null);
        try {
            await firestore.collection('users').add(user);
        }catch (e) {
            setErrorMessage(e.message);
        }
        setIsLoading(false);
    };

    const displayErrorMessage = errorMessage !== null && <CustomAlert>{errorMessage}</CustomAlert>;

    return (
        <FormProvider {...methods}>
            <Box w='100%' maxW='500px' m='auto' mt={2} mb={2}>
                <Box border='1px solid lightgray' borderRadius={4} p={4}>
                    <Text fontSize='3xl' textAlign={'center'} fontWeight={'bold'} mb={2}>
                        Create a new user
                    </Text>
                    {displayErrorMessage}
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <CustomTextInput
                            required
                            name='name'
                            label='Name'
                            placeholder='Admin Userson'
                        />
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
                        <CustomSelect
                            required
                            name='role'
                            label='Role'
                            placeholder='Select a role for the user'
                        >
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                        </CustomSelect>
                        <Button mt={1} colorScheme="teal" isLoading={isLoading} loadingText={'Submit'} type="submit">
                            Submit
                        </Button>
                    </form>
                </Box>

            </Box>
        </FormProvider>
    )
};

export default CreateUserForm;