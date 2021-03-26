import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

interface Props {
  onClose: () => void;
  isOpen: boolean;
}

const BaseModalForm: React.FC<Props> = (props) => {
  const { children, onClose, isOpen } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default BaseModalForm;
