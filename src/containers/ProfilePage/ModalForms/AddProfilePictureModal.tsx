import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import NonFungibleForm from './NonFungibleForm';
import {
  selectProfilePictureSubmitting,
  selectShowProfilePictureModal,
  closeProfilePictureModal,
  getProfilePicture,
} from './slice';

function AddProfilePictureModal() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShowProfilePictureModal);
  const submitting = useAppSelector(selectProfilePictureSubmitting);

  return (
    <Modal isOpen={show} onClose={() => dispatch(closeProfilePictureModal())}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {intl.formatMessage({ id: 'add-profile-picture-modal-header', defaultMessage: 'Add an NFT Profile Picture' })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <NonFungibleForm />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" variant="outline" mr={3} onClick={() => dispatch(closeProfilePictureModal())}>
            {intl.formatMessage({ id: 'add-profile-picture-modal-close', defaultMessage: 'Cancel' })}
          </Button>
          <Button colorScheme="brand" onClick={() => dispatch(getProfilePicture())} isLoading={submitting}>
            {intl.formatMessage({ id: 'add-profile-picture-modal-submit', defaultMessage: 'Add' })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddProfilePictureModal;
