import { Box } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { Blockchains, Interfaces } from '../../../common/constants';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  selectNonFungibleForm,
  updateNonFungibleAddress,
  updateNonFungibleBlockchain,
  updateNonFungibleInterface,
  updateNonFungibleTokenId,
} from './slice';

function NonFungibleForm() {
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

export default NonFungibleForm;
