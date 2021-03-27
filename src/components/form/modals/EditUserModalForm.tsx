import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Text } from '@chakra-ui/react';
import { User, UserRoles } from '../../../types/User';
import { useUserData } from '../../../contexts/UserDataContext';
import CustomAlert from '../../CustomAlert';
import ModalFormContainer from './ModalFormContainer';
import CustomTextInput from '../fields/CustomTextInput';
import CustomSelect from '../fields/CustomSelect';
import useResetForm from '../useResetForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  values: {
    name?: string;
    email?: string;
    role?: UserRoles;
    id: string;
  };
}

export interface EditUserFormData {
  name: string;
  role: UserRoles;
  email: string;
}

const EditUserModalForm: React.FC<Props> = (props) => {
  const { isOpen, onClose } = props; // hook for modal dialog
  const { id, name, email, role } = props.values;

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const methods = useForm<EditUserFormData>();
  useResetForm(methods.reset, methods.clearErrors);

  const { canAssignRoles, editUser } = useUserData()!;

  const submitForm = async (formData: EditUserFormData) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await editUser(formData as User, id);
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
          Edit user data
        </Text>
        {displayErrorMessage}
        <form onSubmit={methods.handleSubmit(submitForm)} noValidate>
          <CustomTextInput name="name" label="Name" placeholder="Admin Userson" value={name} />
          <CustomTextInput
            name="email"
            type="email"
            label="Email"
            placeholder="test@example.com"
            value={email}
          />
          {canAssignRoles() && (
            <CustomSelect
              name="role"
              label="Role"
              placeholder="Select a role for the user"
              value={role}
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
      </ModalFormContainer>
    </FormProvider>
  );
};

export default EditUserModalForm;
