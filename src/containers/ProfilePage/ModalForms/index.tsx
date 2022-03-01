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
import { Blockchains, Interfaces } from '../../../common/constants';
import { BadgeTypes } from '../../../common/types';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  closeBadgeModal,
  submitBadge,
  selectFungibleForm,
  selectNonFungibleForm,
  selectStatForm,
  updateBadgeType,
  updateFungibleAddress,
  updateFungibleBlockchain,
  updateNonFungibleAddress,
  updateNonFungibleBlockchain,
  updateNonFungibleInterface,
  updateNonFungibleTokenId,
  updateStatBlockchain,
  updateStatInterface,
  selectShowBadgeModal,
  selectBadgeType,
  selectBadgeSubmitting,
  selectProfilePictureSubmitting,
  selectShowProfilePictureModal,
  closeProfilePictureModal,
  getProfilePicture,
} from './slice';

export function AddBadgeModal() {
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
            {intl.formatMessage({ id: 'add-badge-form-close', defaultMessage: 'Cancel' })}
          </Button>
          <Button
            colorScheme="brand"
            onClick={() => dispatch(submitBadge(type))}
            isLoading={submitting}
            disabled={!type}
          >
            {intl.formatMessage({ id: 'add-badge-form-submit', defaultMessage: 'Add' })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export function AddProfilePictureModal() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShowProfilePictureModal);
  const submitting = useAppSelector(selectProfilePictureSubmitting);
  return (
    <Modal isOpen={show} onClose={() => dispatch(closeProfilePictureModal())}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {intl.formatMessage({ id: 'add-profile-picture-form-header', defaultMessage: 'Add a Profile Picture' })}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <NonFungibleForm />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" variant="outline" mr={3} onClick={() => dispatch(closeProfilePictureModal())}>
            {intl.formatMessage({ id: 'add-profile-picture-form-close', defaultMessage: 'Cancel' })}
          </Button>
          <Button colorScheme="brand" onClick={() => dispatch(getProfilePicture())} isLoading={submitting}>
            {intl.formatMessage({ id: 'add-profile-picture-form-submit', defaultMessage: 'Add' })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export function NonFungibleForm() {
  const intl = useIntl();
  const { blockchain, interface: interfaceName, address, token_id } = useAppSelector(selectNonFungibleForm);
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Select
        id="blockchain"
        label={intl.formatMessage({ id: 'select-blockchain', defaultMessage: 'Blockchain' })}
        value={blockchain}
        options={[
          {
            id: Blockchains.ETHEREUM,
            label: 'Ethereum',
          },
          {
            id: Blockchains.POLYGON,
            label: 'Polygon',
          },
          {
            id: Blockchains.ARBITRUM,
            label: 'Arbitrum',
          },
          {
            id: Blockchains.OPTIMISM,
            label: 'Optimism',
          },
        ]}
        onChange={(event) => dispatch(updateNonFungibleBlockchain(event.target.value))}
        mt={5}
      />
      <Select
        id="interface"
        label={intl.formatMessage({ id: 'select-interface', defaultMessage: 'Interface' })}
        value={interfaceName}
        options={[
          {
            id: Interfaces.ERC721,
            label: 'ERC721',
          },
          {
            id: Interfaces.ERC1155,
            label: 'ERC1155',
          },
          {
            id: Interfaces.ENS_REGISTRAR,
            label: 'ENS Name',
          },
        ]}
        onChange={(event) => dispatch(updateNonFungibleInterface(event.target.value))}
        mt={5}
      />
      <Input
        id="contract-address"
        value={address}
        label={intl.formatMessage({ id: 'input-contract-address', defaultMessage: 'Address' })}
        onChange={(event) => dispatch(updateNonFungibleAddress(event.target.value))}
        mt={5}
      />
      <Input
        id="token-id"
        value={token_id}
        label={intl.formatMessage({ id: 'input-token-id', defaultMessage: 'Token Id' })}
        onChange={(event) => dispatch(updateNonFungibleTokenId(event.target.value))}
        mt={5}
      />
    </Box>
  );
}

export function FungibleForm() {
  const intl = useIntl();
  const { blockchain, address } = useAppSelector(selectFungibleForm);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Select
        id="blockchain"
        label={intl.formatMessage({ id: 'select-blockchain', defaultMessage: 'Blockchain' })}
        value={blockchain}
        options={[
          {
            id: Blockchains.ETHEREUM,
            label: 'Ethereum',
          },
          {
            id: Blockchains.POLYGON,
            label: 'Polygon',
          },
          {
            id: Blockchains.ARBITRUM,
            label: 'Arbitrum',
          },
          {
            id: Blockchains.OPTIMISM,
            label: 'Optimism',
          },
        ]}
        onChange={(event) => dispatch(updateFungibleBlockchain(event.target.value))}
        mt={5}
      />
      <Input
        id="token-symbol"
        value=""
        label={intl.formatMessage({ id: 'input-token-symbol', defaultMessage: 'Token Symbol' })}
        onChange={() => {}}
        mt={5}
      />
      <Input
        id="contract-address"
        value={address}
        label={intl.formatMessage({ id: 'input-contract-address', defaultMessage: 'Address' })}
        onChange={(event) => dispatch(updateFungibleAddress(event.target.value))}
        mt={5}
      />
    </Box>
  );
}

export function StatForm() {
  const intl = useIntl();
  const { blockchain, interface: interfaceName } = useAppSelector(selectStatForm);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <Select
        id="blockchain"
        label={intl.formatMessage({ id: 'select-blockchain', defaultMessage: 'Blockchain' })}
        value={blockchain}
        options={[
          {
            id: Blockchains.ETHEREUM,
            label: 'Ethereum',
          },
          {
            id: Blockchains.POLYGON,
            label: 'Polygon',
          },
          {
            id: Blockchains.ARBITRUM,
            label: 'Arbitrum',
          },
          {
            id: Blockchains.OPTIMISM,
            label: 'Optimism',
          },
        ]}
        onChange={(event) => dispatch(updateStatBlockchain(event.target.value))}
        mt={5}
      />
      <Select
        id="interface"
        label={intl.formatMessage({ id: 'select-stat-type', defaultMessage: 'Statistic Type' })}
        value={interfaceName}
        options={[
          {
            id: Interfaces.SUSHISWAP_EXCHANGE,
            label: intl.formatMessage({ id: 'sushiswap-exchange', defaultMessage: 'Sushiswap Swaps' }),
          },
          {
            id: Interfaces.UNISWAP_V2_EXCHANGE,
            label: intl.formatMessage({ id: 'uniswap-v2-exchange', defaultMessage: 'Uniswap V2 Swaps' }),
          },
          {
            id: Interfaces.UNISWAP_V3_EXCHANGE,
            label: intl.formatMessage({ id: 'uniswap-v3-exchange', defaultMessage: 'Uniswap V3 Swaps' }),
          },
        ]}
        onChange={(event) => dispatch(updateStatInterface(event.target.value))}
        mt={5}
      />
    </Box>
  );
}
