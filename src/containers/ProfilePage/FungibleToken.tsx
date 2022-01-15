import { Image, Text, Heading, Box, Badge as ChakraBadge, Flex, Link, Icon } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { ContractKeys, FungibleToken } from '../../constants';
import Badge from '../../components/Badge';
import useDisplayBalance from '../../hooks/useDisplayBalance';
import useContractKey from '../../hooks/useContractKey';

function FungibleTokenComponent({
  metadata: { name, symbol, decimals },
  contract: { address, blockchain, interface: interfaceName },
  balance,
}: FungibleToken) {
  const displayBalance = useDisplayBalance(balance, decimals);
  const contractKey = useContractKey(address, blockchain);

  return (
    <Badge
      Display={
        <Box height={240}>
          <Flex justifyContent="center" mt={10} mb={5}>
            {contractKey === ContractKeys.UNKNOWN ? (
              <Heading as="h1" size="xl">
                ERC20
              </Heading>
            ) : (
              <Image
                alt={symbol}
                src={`${process.env.PUBLIC_URL}/contracts/${contractKey.toLowerCase()}.svg`}
                width={100}
                height={100}
                borderRadius={12}
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
          <Link color="blue.500" href={`https://etherscan.io/address/${address}`} isExternal>
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
