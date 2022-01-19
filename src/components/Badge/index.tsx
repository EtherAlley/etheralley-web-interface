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
} from '@chakra-ui/react';
import Paper from '../../components/Paper';

function Badge({
  Display,
  DialogHeader,
  DialogBody,
}: {
  Display: ReactNode;
  DialogHeader: ReactNode;
  DialogBody: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  return (
    <Paper
      as="button"
      onClick={() => setIsOpen(true)}
      _hover={{ transform: 'scale(1.1)' }}
      height={200}
      width={165}
      borderRadius={8}
      transition="all .1s ease-in-out"
    >
      <>
        {Display}
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
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
    </Paper>
  );
}

export default Badge;
