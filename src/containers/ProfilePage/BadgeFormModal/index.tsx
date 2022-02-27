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
import Input from '../../../components/Input';
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
  const intl = useIntl();
  const { type } = useAppSelector(selectBadgeForm);
  const dispatch = useAppDispatch();

  const options: { id: string; label: string }[] = [];
  for (const [, value] of Object.entries(BadgeTypes)) {
    switch (value) {
      case BadgeTypes.FungibleToken:
        options.push({
          id: value,
          label: intl.formatMessage({ id: 'fungible-token-option', defaultMessage: 'Fungible Token' }),
        });
        break;
      case BadgeTypes.NonFungibleToken:
        options.push({
          id: value,
          label: intl.formatMessage({ id: 'non-fungible-token-option', defaultMessage: 'Non Fungible Token' }),
        });
        break;
      case BadgeTypes.Statistics:
        options.push({
          id: value,
          label: intl.formatMessage({ id: 'statistic-option', defaultMessage: 'Statistic' }),
        });
        break;
    }
  }

  return (
    <Box>
      <Select
        id="select-badge-type"
        label={intl.formatMessage({ id: 'select-badge-type', defaultMessage: 'Select badge type' })}
        options={options}
        value={type}
        onChange={(event) => {
          dispatch(updateBadgeType(event.target.value));
        }}
        mb={5}
      />
      <Divider mb={5} />
      <NonFungibleForm />
      <FungibleForm />
      <StatForm />
    </Box>
  );
}

function NonFungibleForm() {
  const intl = useIntl();
  const { type } = useAppSelector(selectBadgeForm);
  const dispatch = useAppDispatch();

  if (type !== BadgeTypes.NonFungibleToken) {
    return <></>;
  }
  return (
    <Box>
      <Select id="blockchain" label="Blockchain" value={undefined} options={[]} onChange={() => {}} />
      <Select id="interface" label="Interface" value={undefined} options={[]} onChange={() => {}} />
      <Input id="contract-address" value="" label="Address" />
      <Input id="token-id" value="" label="Token Id" />
    </Box>
  );
}

function FungibleForm() {
  const intl = useIntl();
  const { type } = useAppSelector(selectBadgeForm);
  const dispatch = useAppDispatch();

  if (type !== BadgeTypes.FungibleToken) {
    return <></>;
  }
  return (
    <Box>
      <Select id="blockchain" label="Blockchain" value={undefined} options={[]} onChange={() => {}} />
      <Input id="token-symbol" value="" label="Token Symbol" />
      <Input id="contract-address" value="" label="Address" />
    </Box>
  );
}

function StatForm() {
  const intl = useIntl();
  const { type } = useAppSelector(selectBadgeForm);
  const dispatch = useAppDispatch();

  if (type !== BadgeTypes.Statistics) {
    return <></>;
  }
  return (
    <Box>
      <Select id="blockchain" label="Blockchain" value={undefined} options={[]} onChange={() => {}} />
      <Select id="interface" label="Stat Type" value={undefined} options={[]} onChange={() => {}} />
    </Box>
  );
}

export default BadgeFormModal;
