import React from 'react';
import { Alert, AlertDescription, AlertIcon } from '@chakra-ui/react';
import { AlertProps } from '@chakra-ui/alert/dist/types/alert';

interface Props extends AlertProps {
  message: string;
}

const CustomAlert: React.FC<Props> = (props) => {
  const { status = 'error', message, ...others } = props;

  return (
    <Alert status={status} mb={2} {...others}>
      <AlertIcon />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
