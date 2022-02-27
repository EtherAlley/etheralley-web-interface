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
import { BadgeTypes } from '../../../common/types';
import Select from '../../../components/Select';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { closeBadgeForm, selectBadgeForm, selectShowBadgeForm, updateBadgeType } from '../slice';

function BadgeFormModal() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const showBadgeForm = useAppSelector(selectShowBadgeForm);

  return (
    <Modal isOpen={showBadgeForm} onClose={() => dispatch(closeBadgeForm())}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {intl.formatMessage({ id: 'badge-form-header', defaultMessage: 'Add a new badge to your collection' })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <NewBadgeForm />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" variant="outline" mr={3} onClick={() => dispatch(closeBadgeForm())}>
            {intl.formatMessage({ id: 'badge-form-close', defaultMessage: 'Cancel' })}
          </Button>
          <Button colorScheme="brand">{intl.formatMessage({ id: 'badge-form-submit', defaultMessage: 'Add' })}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function NewBadgeForm() {
  const { type } = useAppSelector(selectBadgeForm);
  const dispatch = useAppDispatch();

  return (
    <Select
      id="select-badge-type"
      label="Select Badge Type"
      options={Object.entries(BadgeTypes).map(([_, value]) => ({ id: value, label: value }))}
      value={type}
      onChange={(event) => {
        dispatch(updateBadgeType(event.target.value));
      }}
    />
  );
}

export default BadgeFormModal;
