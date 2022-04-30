import { Box, Button, Flex, Popover, PopoverAnchor, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { Blockchains } from '../../../common/constants';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useSearchTokens from '../../../hooks/useSearchTokens';
import {
  selectFungibleForm,
  submitFungibleSearch,
  updateFungibleAddress,
  updateFungibleBlockchain,
  updateFungibleKeyword,
} from './slice';
import { useRef } from 'react';
import Logo from '../../../components/Logo';

function FungibleForm() {
  const intl = useIntl();
  const { blockchain, address, keyword, submitted } = useAppSelector(selectFungibleForm);
  const dispatch = useAppDispatch();
  const tokens = useSearchTokens(keyword, blockchain);
  const initialFocusRef = useRef(null);

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
      <Popover isOpen={tokens.length > 0 && !submitted} initialFocusRef={initialFocusRef}>
        <PopoverAnchor>
          <Input
            id="search-tokens"
            label={intl.formatMessage({ id: 'search-tokens', defaultMessage: 'Search Tokens' })}
            value={keyword}
            onChange={(event) => dispatch(updateFungibleKeyword(event.target.value))}
            onKeyPress={(event) => {
              if (event.key === 'Enter' && tokens.length > 0) {
                dispatch(submitFungibleSearch(tokens[0]));
              }
            }}
            mt={5}
            ref={initialFocusRef}
            autoComplete="off"
            disabled={!blockchain}
          />
        </PopoverAnchor>
        <PopoverTrigger>
          <Flex justifyContent="center">
            <Button display="none" />
          </Flex>
        </PopoverTrigger>
        <PopoverContent>
          {tokens.map(({ address, name }) => {
            return (
              <Button
                key={address}
                borderRadius="none"
                onClick={() => dispatch(submitFungibleSearch({ address, name }))}
                display="block"
              >
                <Flex alignItems="center">
                  <Text>{name}</Text>
                  <Box flexGrow={1} />
                  <Logo blockchain={blockchain} contractAddress={address} width={8} height={8} />
                </Flex>
              </Button>
            );
          })}
        </PopoverContent>
      </Popover>
      <Input
        id="contract-address"
        value={address}
        label={intl.formatMessage({ id: 'input-contract-address', defaultMessage: 'Address' })}
        onChange={(event) => dispatch(updateFungibleAddress(event.target.value))}
        mt={5}
        disabled={!blockchain}
      />
    </Box>
  );
}

export default FungibleForm;
