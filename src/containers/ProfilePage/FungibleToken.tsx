import { Image, Text, Heading, Box, Badge as ChakraBadge, Flex, Link, Icon } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { Blockchains, ContractKeys } from '../../common/constants';
import Badge from '../../components/Badge';
import useDisplayBalance from '../../hooks/useDisplayBalance';
import useContractKey from '../../hooks/useContractKey';
import { FungibleToken } from '../../api/types';
import Settings from '../../common/settings';

function getEtherscanUrl(address: string, blockchain: Blockchains): string {
  switch (blockchain) {
    case Blockchains.ETHEREUM:
    default:
      return `${Settings.ETHERSCAN_ETHEREUM_URL}/address/${address}`;
    case Blockchains.ARBITRUM:
      return `${Settings.ETHERSCAN_ARBITRUM_URL}/address/${address}`;
    case Blockchains.OPTIMISM:
      return `${Settings.ETHERSCAN_OPTIMISM_URL}/address/${address}`;
    case Blockchains.POLYGON:
      return `${Settings.ETHERSCAN_POLYGON_URL}/address/${address}`;
  }
}

function FungibleTokenComponent({
  metadata: { name, symbol, decimals },
  contract: { address, blockchain, interface: interfaceName },
  balance,
}: FungibleToken) {
  const displayBalance = useDisplayBalance(balance, decimals);
  const contractKey = useContractKey(address, blockchain);

  const coinStyling = {
    width: 100,
    height: 100,
    backgroundColor: 'gray.900',
    borderColor: 'gray.900',
    borderRadius: '50%',
    boxShadow: 'dark-lg',
    borderWidth: '1px',
    padding: 3,
  };

  return (
    <Badge
      Display={
        <Box height={240}>
          <Flex justifyContent="center" mt={10} mb={5}>
            {contractKey === ContractKeys.UNKNOWN ? (
              <Box {...coinStyling} pt={9}>
                <Heading as="h3" size="md">
                  {symbol}
                </Heading>
              </Box>
            ) : (
              <Image
                alt={symbol}
                src={`${Settings.PUBLIC_URL}/contracts/${contractKey.toLowerCase()}.svg`}
                {...coinStyling}
              />
            )}
          </Flex>
          <ChakraBadge borderRadius={8} py={1} px={2}>
            <Heading as="h3" size="md" noOfLines={2}>
              {displayBalance + ' ' + symbol}
            </Heading>
          </ChakraBadge>
        </Box>
      }
      DialogHeader={name}
      DialogBody={
        <>
          <Link color="blue.500" href={getEtherscanUrl(address, blockchain)} isExternal>
            Etherscan <Icon as={RiExternalLinkLine}></Icon>
          </Link>
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

// alternative styling

// const BadgeDisplay1 = () => (
//   <Box
//     width={200}
//     height={240}
//     backdropFilter="opacity(0.8)"
//     overflow="hidden"
//     display="flex"
//     alignItems="center"
//     justifyContent="center"
//     flexDirection="column"
//   >
//     <Box>
//       <Image alt={symbol} src={tokenLogo} height="100px" width="100px" />
//       <Image
//         alt={symbol}
//         src={tokenLogo}
//         position="absolute"
//         top={75}
//         left={75}
//         backgroundSize="250%"
//         filter="blur(60px)"
//         display="block"
//         opacity={0.6}
//       />
//     </Box>
//     <Box mt={5}>
//       <Heading as="h3" size="md" noOfLines={2}>
//         {displayBalance + ' ' + symbol}
//       </Heading>
//     </Box>
//   </Box>
// );
