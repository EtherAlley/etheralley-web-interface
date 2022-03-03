import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Divider,
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { BadgeTypes } from '../../../common/types';
import Select from '../../../components/Select';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import FungibleForm from './FungibleForm';
import NonFungibleForm from './NonFungibleForm';
import StatForm from './StatForm';
import {
  closeBadgeModal,
  submitBadge,
  updateBadgeType,
  selectShowBadgeModal,
  selectBadgeType,
  selectBadgeSubmitting,
} from './slice';

function AddBadgeModal() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShowBadgeModal);
  const type = useAppSelector(selectBadgeType);
  const submitting = useAppSelector(selectBadgeSubmitting);

  let form;
  switch (type) {
    case BadgeTypes.FungibleToken:
      form = <FungibleForm />;
      break;
    case BadgeTypes.NonFungibleToken:
      form = <NonFungibleForm />;
      break;
    case BadgeTypes.Statistics:
      form = <StatForm />;
      break;
  }

  return (
    <Modal isOpen={show} onClose={() => dispatch(closeBadgeModal())}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {intl.formatMessage({ id: 'add-badge-form-header', defaultMessage: 'Add a new badge to your collection' })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Select
              id="select-badge-type"
              label={intl.formatMessage({ id: 'select-badge-type', defaultMessage: 'Select badge type' })}
              options={[
                {
                  id: BadgeTypes.NonFungibleToken,
                  label: intl.formatMessage({ id: 'non-fungible-token-option', defaultMessage: 'Non Fungible Token' }),
                },
                {
                  id: BadgeTypes.FungibleToken,
                  label: intl.formatMessage({ id: 'fungible-token-option', defaultMessage: 'Fungible Token' }),
                },
                {
                  id: BadgeTypes.Statistics,
                  label: intl.formatMessage({ id: 'statistic-option', defaultMessage: 'Statistic' }),
                },
              ]}
              value={type}
              onChange={(event) => {
                dispatch(updateBadgeType(event.target.value));
              }}
              mt={5}
            />
            <Divider mt={5} />
            {form}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" variant="outline" mr={3} onClick={() => dispatch(closeBadgeModal())}>
            {intl.formatMessage({ id: 'add-badge-modal-close', defaultMessage: 'Cancel' })}
          </Button>
          <Button colorScheme="brand" onClick={() => dispatch(submitBadge())} isLoading={submitting} disabled={!type}>
            {intl.formatMessage({ id: 'add-badge-modal-submit', defaultMessage: 'Add' })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddBadgeModal;
