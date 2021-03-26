import React, { useEffect } from 'react';
import { Button, Text } from '@chakra-ui/react';
import CustomTextInput from './fields/CustomTextInput';
import CustomSelect from './fields/CustomSelect';
import { FormProvider, useForm } from 'react-hook-form';
import { UserRole } from '../../types/User';
import CustomAlert from '../CustomAlert';
import { useUser } from '../../contexts/UserContext';
import useFormHook from './useFormHook';
import BaseModalForm from './BaseModalForm';
import firebase from 'firebase';

export interface CreateUserFormType {
  name: string;
  role: UserRole;
  email: string;
  createdAt: firebase.firestore.Timestamp;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserModalForm: React.FC<Props> = (props) => {
  const { canAssignRoles } = useUser()!;
  const { onSubmit, isLoading, errorMessage } = useFormHook();
  const methods = useForm<CreateUserFormType>();
  const { isOpen, onClose } = props; // hook for modal dialog

  const submitForm = (values: CreateUserFormType) => {
    onSubmit({
      ...values,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    })
      .then(() => onClose())
      .catch((e) => console.log(e.message));
  };

  const { reset, clearErrors } = methods;

  useEffect(() => {
    return () => {
      reset();
      clearErrors();
      //reset form when modal unmounts
    };
  }, [reset, clearErrors]);

  const displayErrorMessage = errorMessage !== null && (
    <CustomAlert>{errorMessage}</CustomAlert>
  );
  return (
    <FormProvider {...methods}>
      <BaseModalForm isOpen={isOpen} onClose={onClose}>
        <Text fontSize="3xl" textAlign={'center'} fontWeight={'bold'} mb={2}>
          Create a new user
        </Text>
        {displayErrorMessage}
        <form onSubmit={methods.handleSubmit(submitForm)} noValidate>
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
          {canAssignRoles() && (
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
          )}
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
      </BaseModalForm>
    </FormProvider>
  );
};

export default CreateUserModalForm;
