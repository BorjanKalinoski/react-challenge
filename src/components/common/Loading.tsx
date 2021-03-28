import { Container, Spinner, VStack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  message?: string;
}

const Loading: React.FC<Props> = (props) => {
  const { message = 'Loading' } = props;

  return (
    <Container textAlign={'center'} mt={10}>
      <VStack>
        <span>{message}</span>
        <Spinner />
      </VStack>
    </Container>
  );
};

export default Loading;
