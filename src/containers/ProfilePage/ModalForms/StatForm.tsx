import { Box } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { Blockchains, Interfaces } from '../../../common/constants';
import Select from '../../../components/Select';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectStatForm, updateStatBlockchain, updateStatInterface } from './slice';

function StatForm() {
  const intl = useIntl();
  const { blockchain, interface: interfaceName } = useAppSelector(selectStatForm);
  const dispatch = useAppDispatch();

  let interfaceOptions: {
    id: string;
    label: string;
  }[] = [];
  switch (blockchain) {
    case Blockchains.ETHEREUM:
      interfaceOptions = [
        {
          id: Interfaces.SUSHISWAP_EXCHANGE,
          label: `Sushiswap ${intl.formatMessage({ id: 'swaps', defaultMessage: 'Swaps' })}`,
        },
        {
          id: Interfaces.UNISWAP_V2_EXCHANGE,
          label: `Uniswap V2 ${intl.formatMessage({ id: 'swaps', defaultMessage: 'Swaps' })}`,
        },
        {
          id: Interfaces.UNISWAP_V3_EXCHANGE,
          label: `Uniswap V3 ${intl.formatMessage({ id: 'swaps', defaultMessage: 'Swaps' })}`,
        },
      ];
      break;
    case Blockchains.POLYGON:
    case Blockchains.ARBITRUM:
      interfaceOptions = [
        {
          id: Interfaces.SUSHISWAP_EXCHANGE,
          label: `Sushiswap ${intl.formatMessage({ id: 'swaps', defaultMessage: 'Swaps' })}`,
        },
      ];
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
        disabled={!blockchain}
        value={interfaceName}
        options={interfaceOptions}
        onChange={(event) => dispatch(updateStatInterface(event.target.value))}
        mt={5}
      />
    </Box>
  );
}

export default StatForm;
