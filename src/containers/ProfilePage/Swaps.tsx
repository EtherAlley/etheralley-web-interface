import {
  Heading,
  Box,
  Badge as ChakraBadge,
  Flex,
  UnorderedList,
  OrderedList,
  ListItem,
  Text,
  Image,
} from '@chakra-ui/react';
import Badge from '../../components/Badge';
import { Contract, Swap } from '../../api/types';
import Settings from '../../common/settings';
import useInterfaceKey from '../../hooks/useInterfaceKey';

const logoStyling = {
  width: 100,
  height: 100,
  padding: 2,
  backgroundColor: 'gray.900',
  borderColor: 'gray.900',
  borderRadius: '50%',
  boxShadow: 'dark-lg',
  borderWidth: '1px',
};

function SwapComponent({ swaps, contract }: { swaps: Swap[]; contract: Contract }) {
  const key = useInterfaceKey(contract.interface);
  return (
    <Badge
      Display={
        <Box height={240}>
          <Flex justifyContent="center" mt={5} mb={5}>
            <Image alt={key} src={`${Settings.PUBLIC_URL}/interfaces/${key.toLowerCase()}.svg`} {...logoStyling} />
          </Flex>
          <ChakraBadge borderRadius={8} py={1} px={2}>
            <Heading as="h3" size="md" noOfLines={2}>
              {swaps.length} SWAPS
            </Heading>
          </ChakraBadge>
        </Box>
      }
      DialogHeader={'Top Swaps'}
      DialogBody={<SwapBody swaps={swaps} contract={contract} />}
    />
  );
}

function SwapBody({ swaps, contract }: { swaps: Swap[]; contract: Contract }) {
  return (
    <OrderedList>
      {swaps.map(({ id, timestamp, amountUSD, input, output }, i) => (
        <ListItem key={i}>
          <Text>Swap {i + 1}</Text>
          <UnorderedList>
            <ListItem key={0}>
              <Text>{id}</Text>
            </ListItem>
            <ListItem key={1}>
              <Text>{timestamp}</Text>
            </ListItem>
            <ListItem key={2}>
              <Text>Amount: {amountUSD} USD</Text>
            </ListItem>
            <ListItem key={3}>
              <Text>
                Input: {input.amount} {input.symbol}
              </Text>
            </ListItem>
            <ListItem key={4}>
              <Text>
                Output: {output.amount} {output.symbol}
              </Text>
            </ListItem>
          </UnorderedList>
        </ListItem>
      ))}
    </OrderedList>
  );
}

export default SwapComponent;

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
