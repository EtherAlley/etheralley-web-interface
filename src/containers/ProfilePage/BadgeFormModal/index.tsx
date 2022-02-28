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
  closeBadgeForm,
  submitForm,
  selectFungibleForm,
  selectNonFungibleForm,
  selectShow,
  selectStatForm,
  selectSubmitting,
  selectType,
  updateBadgeType,
  updateFungibleAddress,
  updateFungibleBlockchain,
  updateNonFungibleAddress,
  updateNonFungibleBlockchain,
  updateNonFungibleInterface,
  updateNonFungibleTokenId,
  updateStatBlockchain,
  updateStatInterface,
} from './slice';

function BadgeFormModal() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectShow);
  const type = useAppSelector(selectType);
  const submitting = useAppSelector(selectSubmitting);

  return (
    <Modal isOpen={show} onClose={() => dispatch(closeBadgeForm())}>
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
          <Button
            colorScheme="brand"
            onClick={() => dispatch(submitForm(type))}
            isLoading={submitting}
            disabled={!type}
          >
            {intl.formatMessage({ id: 'badge-form-submit', defaultMessage: 'Add' })}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

function NewBadgeForm() {
  const intl = useIntl();
  const type = useAppSelector(selectType);
  const dispatch = useAppDispatch();

  return (
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
      <NonFungibleForm />
      <FungibleForm />
      <StatForm />
    </Box>
  );
}

function NonFungibleForm() {
  const intl = useIntl();
  const type = useAppSelector(selectType);
  const { blockchain, interface: interfaceName, address, token_id } = useAppSelector(selectNonFungibleForm);
  const dispatch = useAppDispatch();

  if (type !== BadgeTypes.NonFungibleToken) {
    return <></>;
  }

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

function FungibleForm() {
  const intl = useIntl();
  const type = useAppSelector(selectType);
  const { blockchain, address } = useAppSelector(selectFungibleForm);
  const dispatch = useAppDispatch();

  if (type !== BadgeTypes.FungibleToken) {
    return <></>;
  }

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

function StatForm() {
  const intl = useIntl();
  const type = useAppSelector(selectType);
  const { blockchain, interface: interfaceName } = useAppSelector(selectStatForm);
  const dispatch = useAppDispatch();

  if (type !== BadgeTypes.Statistics) {
    return <></>;
  }

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

export default BadgeFormModal;
