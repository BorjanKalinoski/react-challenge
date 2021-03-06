import React from 'react';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const ModalFormContainer: React.FC<Props> = (props) => {
  const { children, onClose, isOpen } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth={300} maxWidth={450} w="90%" mx="auto">
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalFormContainer;
