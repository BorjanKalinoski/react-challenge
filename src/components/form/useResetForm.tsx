import { useEffect } from 'react';

//reset and clearErrors come from the react-hook-form 'methods' object
export default function useResetForm(reset: Function, clearErrors: Function) {
  useEffect(() => {
    return () => {
      //clears all the errors and resets the form values on unmount
      reset();
      clearErrors();
    };
  }, [reset, clearErrors]);
}
