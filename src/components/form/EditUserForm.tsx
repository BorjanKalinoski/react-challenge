import {UserRole} from "../../types/User";
import React, {useEffect} from "react";
import {useUser} from "../../contexts/UserContext";
import useFormHook from "./useFormHook";
import {FormProvider, useForm} from "react-hook-form";
import {Button, Text, useDisclosure} from "@chakra-ui/react";
import CustomAlert from "../common/CustomAlert";
import ModalForm from "./ModalForm";
import CustomTextInput from "./fields/CustomTextInput";
import CustomSelect from "./fields/CustomSelect";

interface Props {
    values: {
        name?: string;
        email?: string;
        role?: UserRole;
        id: string;
    };
}

export interface EditUserFormType {
    name: string;
    role: UserRole;
    email: string;
}

const EditUserForm: React.FC<Props> = (props) => {
    const {canAssignRoles} = useUser()!;
    const {onSubmit, isLoading, errorMessage} = useFormHook(props.values.id);
    const methods = useForm<EditUserFormType>();
    const {isOpen, onOpen, onClose} = useDisclosure();// hook for modal dialog

    const submitForm = (values: EditUserFormType) => {
        onSubmit({
            ...values,
        })
            .then(() => onClose())
            .catch((e) => console.log(e.message));
    };

    useEffect(() => {
        return () => {
            methods.reset();
            methods.clearErrors();
            //reset form when modal unmounts
        };
    }, []);


    const displayErrorMessage = errorMessage !== null && <CustomAlert>{errorMessage}</CustomAlert>;
    return (
        <FormProvider {...methods}>
            <Button onClick={onOpen}>
                Edit user data
            </Button>
            <ModalForm isOpen={isOpen} onClose={onClose}>
                <Text fontSize='3xl' textAlign={'center'} fontWeight={'bold'} mb={2}>
                    Edit user data
                </Text>
                {displayErrorMessage}
                <form onSubmit={methods.handleSubmit(submitForm)} noValidate>
                    <CustomTextInput
                        name='name'
                        label='Name'
                        placeholder='Admin Userson'
                        value={props.values?.name}
                    />
                    <CustomTextInput
                        name='email'
                        type='email'
                        label='Email'
                        placeholder='test@example.com'
                        value={props.values?.email}
                    />
                    {
                        canAssignRoles() && <CustomSelect
                            name='role'
                            label='Role'
                            placeholder='Select a role for the user'
                            value={props.values?.role}
                        >
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="moderator">Regular</option>
                        </CustomSelect>
                    }
                    <Button mt={1} colorScheme="teal" isLoading={isLoading} loadingText={'Submit'}
                            type="submit">
                        Submit
                    </Button>
                </form>
            </ModalForm>
        </FormProvider>
    );
};

export default EditUserForm;