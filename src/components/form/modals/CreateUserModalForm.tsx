import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Button, Text } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import CustomTextInput from '../fields/CustomTextInput';
import CustomSelect from '../fields/CustomSelect';
import { User, UserRoles } from '../../../types/User';
import CustomAlert from '../../CustomAlert';
import { useUserData } from '../../../contexts/UserDataContext';
import ModalFormContainer from './ModalFormContainer';

export interface CreateUserFormData {
  name: string;
  role: UserRoles;
  email: string;
  createdAt: firebase.firestore.Timestamp;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserModalForm: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props; // hook for modal dialog

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const methods = useForm<CreateUserFormData>();

  const { canAssignRoles, createUser } = useUserData()!;

  // The states of the modal dialog are preserved even when the dialog is closed
  // That is because it gets mounted and stays mounted while we stay on the same screen where it resides
  // So, to reset the states we need to see when it get closed
  useEffect(() => {
    if (isOpen === false) {
      setErrorMessage(null);
    }
  }, [isOpen]);

  const submitForm = async (formData: CreateUserFormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await createUser(formData as User);
      onClose();
    } catch (e) {
      setErrorMessage(e.message);
    }
    setIsLoading(false);
  };

  const displayErrorMessage = errorMessage !== null && <CustomAlert message={errorMessage!} />;

  return (
    <FormProvider {...methods}>
      <ModalFormContainer isOpen={isOpen} onClose={onClose}>
        <Text fontSize="3xl" textAlign={'center'} fontWeight={'bold'} mb={2}>
          Create a new user
        </Text>
        {displayErrorMessage}
        <form onSubmit={methods.handleSubmit(submitForm)} noValidate>
          <CustomTextInput required name="name" label="Name" placeholder="Admin Userson" />
          <CustomTextInput
            required
            name="email"
            type="email"
            label="Email"
            placeholder="test@example.com"
          />
          <CustomTextInput required name="password" type="password" label="Password" />
          {canAssignRoles() && (
            <CustomSelect
              required
              name="role"
              label="Role"
              placeholder="Select a role for the user"
            >
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="Viewer">Viewer</option>
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
      </ModalFormContainer>
    </FormProvider>
  );
};

export default CreateUserModalForm;
