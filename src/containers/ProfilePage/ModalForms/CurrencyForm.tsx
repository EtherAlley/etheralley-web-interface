import { Box } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { Blockchains } from '../../../common/constants';
import Select from '../../../components/Select';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectCurrencyForm, updateCurrencyBlockchain } from './slice';

function CurrencyForm() {
  const intl = useIntl();
  const { blockchain } = useAppSelector(selectCurrencyForm);
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
        onChange={(event) => dispatch(updateCurrencyBlockchain(event.target.value))}
        mt={5}
      />
    </Box>
  );
}

export default CurrencyForm;
