import { useState } from 'react';
import { firestore } from '../src/config/firebase';
import { CreateUserFormType } from '../src/components/form/modals/CreateUserModalForm';
import { EditUserFormType } from '../src/components/form/modals/EditUserModalForm';

export default function useFormHook(id?: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data: CreateUserFormType | EditUserFormType) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await firestore
        .collection('users')
        .doc(id)
        .set(
          {
            ...data,
          },
          {
            merge: true,
          }
        );
    } catch (e) {
      setErrorMessage(e.message);
    }
    setIsLoading(false);
  };

  return {
    onSubmit,
    isLoading,
    errorMessage,
  };
}
