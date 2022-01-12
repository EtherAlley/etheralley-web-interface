import { Image, Text, Heading, Box } from '@chakra-ui/react';
import { FungibleToken } from '../../constants';
import Badge from '../../components/Badge';

function FungibleTokenComponent({
  metadata: { name, symbol, decimals },
  contract: { address, blockchain, interface: interfaceName },
  balance,
}: FungibleToken) {
  const shift = balance.length - decimals;
  const displayBalance = Number.parseFloat(`${balance.slice(0, shift)}.${balance.slice(shift)}`);

  const tokenLogo = `${process.env.PUBLIC_URL}/tokens/${symbol.toLowerCase()}.svg`;

  return (
    <Badge
      Display={
        <Box
          width={200}
          height={240}
          backdropFilter="opacity(0.8)"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Box>
            <Image alt={symbol} src={tokenLogo} height="100px" width="100px" />
            <Image
              alt={symbol}
              src={tokenLogo}
              position="absolute"
              top={75}
              left={75}
              backgroundSize="250%"
              filter="blur(60px)"
              display="block"
              opacity={0.6}
            />
          </Box>
          <Box mt={5}>
            <Heading as="h3" size="md" noOfLines={2}>
              {displayBalance + ' ' + symbol}
            </Heading>
          </Box>
        </Box>
      }
      DialogHeader={name}
      DialogBody={
        <>
          <Text fontSize="md" noOfLines={3} mt={3}>
            {name}
          </Text>
          <Text fontSize="md" noOfLines={3} mt={3}>
            {symbol}
          </Text>
          <Text fontSize="md" noOfLines={3} mt={3}>
            {address}
          </Text>
          <Text fontSize="md" noOfLines={3} mt={3}>
            {blockchain}
          </Text>
          <Text fontSize="md" noOfLines={3} mt={3}>
            {interfaceName}
          </Text>
        </>
      }
    />
  );
}

export default FungibleTokenComponent;
