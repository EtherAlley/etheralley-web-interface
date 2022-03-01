import { Image, Text, Heading, Box, Badge as ChakraBadge, Flex } from '@chakra-ui/react';
import Badge from '../../../components/Badge';
import useDisplayBalance from '../../../hooks/useDisplayBalance';
import useTokenKey from '../../../hooks/useTokenKey';
import Settings from '../../../common/settings';
import useEtherscanUrl from '../../../hooks/useEtherscanUrl';
import { BADGE_HEIGHT, BADGE_WIDTH } from '../../../common/constants';
import Coin from '../../../icons/Coin';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectFungibleToken } from './../slice';
import LinkComponent from '../../../components/Link';

const coinStyling = {
  width: 85,
  height: 85,
  backgroundColor: 'profile.primary',
  borderColor: 'profile.primary',
  borderRadius: '50%',
  boxShadow: 'dark-lg',
  borderWidth: '1px',
};

function FungibleTokenComponent({ index }: { index: number }) {
  const {
    metadata: { name, symbol, decimals },
    contract: { address, blockchain, interface: interfaceName },
    balance,
  } = useAppSelector((state) => selectFungibleToken(state, index));
  const displayBalance = useDisplayBalance(balance, decimals);
  const key = useTokenKey(address, blockchain);
  const etherscanUrl = useEtherscanUrl(blockchain, 'address', address);

  return (
    <Badge
      width={BADGE_WIDTH}
      height={BADGE_HEIGHT}
      Display={
        <Box maxWidth="100%" maxHeight="100%">
          <Flex justifyContent="center" mb={5}>
            {!key ? (
              <Box {...coinStyling}>
                <Coin width="85px" height="85px" />
              </Box>
            ) : (
              <Image alt={symbol} src={`${Settings.PUBLIC_URL}/logos/${key.toLowerCase()}.png`} {...coinStyling} />
            )}
          </Flex>
          <ChakraBadge borderRadius={8} py={1} px={2} mt={3}>
            <Heading as="h3" size="md" noOfLines={2}>
              {displayBalance + ' ' + symbol}
            </Heading>
          </ChakraBadge>
        </Box>
      }
      DialogHeader={name}
      DialogBody={
        <>
          <Image alt={symbol} src={`${Settings.PUBLIC_URL}/logos/${key.toLowerCase()}.png`} {...coinStyling} />
          <LinkComponent url={etherscanUrl} text="Etherscan" />
          <Text fontSize="md" noOfLines={3} mt={3}>
            Name: {name}
          </Text>
          <Text fontSize="md" noOfLines={3} mt={3}>
            Symbol: {symbol}
          </Text>
          <Text fontSize="md" noOfLines={3} mt={3}>
            Address: {address}
          </Text>
          <Text fontSize="md" noOfLines={3} mt={3}>
            Blockchain: {blockchain}
          </Text>
          <Text fontSize="md" noOfLines={3} mt={3}>
            Interface: {interfaceName}
          </Text>
        </>
      }
    />
  );
}

export default FungibleTokenComponent;