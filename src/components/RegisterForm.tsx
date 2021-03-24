import React from "react";
import {Button, FormLabel, FormErrorMessage, FormControl, Input, Select} from "@chakra-ui/react";
import {FormProvider, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {User} from "../types/User";
import {authRequestAsync} from "../slices/authSlice";
import {RootState} from "../redux/store";
import CustomTextInput from "./form/CustomTextInput";
import CustomSelect from "./form/CustomSelect";

const RegisterForm: React.FC = (props) => {
    const methods = useForm<User>();

    const dispatch = useDispatch();

    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    function onSubmit(user: User) {
        dispatch(authRequestAsync(user));
    }

    return (
        <FormProvider {...methods}>

            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <CustomTextInput required name='name' label='Name' placeholder='Borjan Kalinoski'/>
                <CustomTextInput required name='email' type='email' label='Email' placeholder='test@example.com'/>
                <CustomTextInput required name='password' label='Password' type='password'/>
                <CustomSelect required name='role' label='Role' placeholder='Select a role for the user'>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                </CustomSelect>
                <Button mt={4} colorScheme="teal" isLoading={methods.formState.isSubmitting} type="submit">
                    Register
                </Button>
            </form>
        </FormProvider>

    );
};

export default RegisterForm;