import { ReactNode, useRef, useState } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Box,
} from '@chakra-ui/react';
import Paper from '../../components/Paper';

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
  const cancelRef = useRef(null);
  const boxStyling: any = {
    as: 'button',
    onClick: () => setIsOpen(true),
    _hover: { transform: 'scale(1.1)' },
    width,
    height,
    borderRadius: 8,
    transition: 'all .1s ease-in-out',
  };

  const Content = (
    <>
      {Display}
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent backgroundColor="profile.primary">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {DialogHeader}
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>{DialogBody}</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );

  return usePaper ? <Paper {...boxStyling}>{Content}</Paper> : <Box {...boxStyling}>{Content}</Box>;
}

export default Badge;
