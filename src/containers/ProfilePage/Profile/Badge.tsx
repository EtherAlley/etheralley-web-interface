import { ReactNode, useState } from 'react';
import {
  Button,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Paper from './Paper';

function Badge({
  width,
  height,
  usePaper = true,
  Display,
  DialogHeader,
  DialogBody,
}: {
  width: number;
  height: number;
  usePaper?: boolean;
  Display: ReactNode;
  DialogHeader: ReactNode;
  DialogBody: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const boxStyling: any = {
    as: 'button',
    onClick: () => setIsOpen(true),
    _hover: { transform: 'scale(1.1)' },
    width,
    height,
    borderRadius: 8,
    transition: 'all .1s ease-in-out',
  };

  return (
    <>
      {usePaper ? <Paper {...boxStyling}>{Display}</Paper> : <Box {...boxStyling}>{Display}</Box>}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="profile.secondary">
          <ModalHeader fontSize="lg" fontWeight="bold">
            {DialogHeader}
          </ModalHeader>
          <ModalCloseButton color="profile.accent" />
          <ModalBody>{DialogBody}</ModalBody>
          <ModalFooter>
            <Button bgColor="profile.accent" textColor="profile.secondary" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Badge;
