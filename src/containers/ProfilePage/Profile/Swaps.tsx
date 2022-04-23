import { Box, Flex, UnorderedList, OrderedList, ListItem, Text, Image, Heading } from '@chakra-ui/react';
import Badge from './Badge';
import { Contract, Swap } from '../../../common/types';
import useEtherscanUrl from '../../../hooks/useEtherscanUrl';
import { BADGE_HEIGHT, BADGE_WIDTH, Blockchains, Interfaces } from '../../../common/constants';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectStatistic } from './../slice';
import Link from '../../../components/Link';
import Chip from './Chip';
import { useIntl } from 'react-intl';
import useLogo from '../../../hooks/useLogo';

function SwapComponent({ index }: { index: number }) {
  const stat = useAppSelector((state) => selectStatistic(state, index));
  const data = stat.data as Swap[] | undefined;
  const contract = stat.contract;

  return (
    <Badge
      width={BADGE_WIDTH}
      height={BADGE_HEIGHT}
      Display={<SwapDisplay swaps={data} contract={contract} />}
      DialogHeader={<SwapHeader />}
      DialogBody={<SwapBody swaps={data} contract={contract} />}
    />
  );
}

const logoStyling = {
  width: 100,
  height: 100,
  padding: 2,
  backgroundColor: 'gray.900',
  borderRadius: '50%',
};

function SwapDisplay({ swaps, contract }: { swaps: Swap[] | undefined; contract: Contract }) {
  const intl = useIntl();
  const url = useLogo({ interfaceName: contract.interface });

  let title: string = '';
  switch (contract.interface) {
    case Interfaces.SUSHISWAP_EXCHANGE:
      title = intl.formatMessage({ id: 'sushiswap', defaultMessage: 'Sushiswap' });
      break;
    case Interfaces.UNISWAP_V2_EXCHANGE:
      title = intl.formatMessage({ id: 'uniswap-v2', defaultMessage: 'Uniswap V2' });
      break;
    case Interfaces.UNISWAP_V3_EXCHANGE:
      title = intl.formatMessage({ id: 'uniswap-v3', defaultMessage: 'Uniswap V3' });
      break;
  }

  let text: string = '';
  if (!swaps || !swaps.length) {
    text = intl.formatMessage({ id: 'no-swaps', defaultMessage: 'NO SWAPS' });
  } else if (swaps.length === 1) {
    text = intl.formatMessage({ id: 'first-swap', defaultMessage: 'FIRST SWAP' });
  } else {
    text = intl.formatMessage(
      { id: 'top-n-swaps', defaultMessage: 'TOP {swapcount} SWAPS' },
      { swapcount: swaps ? swaps.length : 0 }
    );
  }

  return (
    <Box maxWidth="100%" maxHeight="100%">
      <Flex justifyContent="center" mb={3}>
        <Image alt={contract.interface} src={url} {...logoStyling} />
      </Flex>
      <Heading as="h4" size="md" mt={2} textColor="profile.secondaryText">
        {title}
      </Heading>
      <Chip text={text} />
    </Box>
  );
}

function SwapHeader() {
  const intl = useIntl();

  return <Text>{intl.formatMessage({ id: 'top-swaps', defaultMessage: 'Top Swaps' })}</Text>;
}

function SwapBody({ swaps, contract }: { swaps: Swap[] | undefined; contract: Contract }) {
  if (!swaps) {
    return <></>;
  }

  return (
    <OrderedList>
      {swaps.map((swap, i) => (
        <Box key={i}>
          <SwapItem swap={swap} contract={contract} />
        </Box>
      ))}
    </OrderedList>
  );
}

function SwapItem({
  swap: { id, timestamp, amountUSD, input, output },
  contract: { blockchain },
}: {
  swap: Swap;
  contract: Contract;
}) {
  const intl = useIntl();
  const etherscanUrl = useEtherscanUrl(blockchain, 'tx', id);

  return (
    <ListItem>
      <UnorderedList>
        <ListItem key={0}>
          <Link href={etherscanUrl} isExternal color="profile.accent">
            Etherscan
          </Link>
        </ListItem>
        <ListItem key={1}>
          <Text>{intl.formatDate(Number.parseInt(timestamp) * 1000)}</Text>
        </ListItem>
        <ListItem key={2}>
          <Text>Amount: {intl.formatNumber(Number.parseFloat(amountUSD), { style: 'currency', currency: 'USD' })}</Text>
        </ListItem>
        <ListItem key={3}>
          <SwapToken amount={input.amount} symbol={input.symbol} contractAddress={input.id} blockchain={blockchain} />
        </ListItem>
        <ListItem key={4}>
          <SwapToken
            amount={output.amount}
            symbol={output.symbol}
            contractAddress={output.id}
            blockchain={blockchain}
          />
        </ListItem>
      </UnorderedList>
    </ListItem>
  );
}

function SwapToken({
  amount,
  symbol,
  contractAddress,
  blockchain,
}: {
  amount: string;
  symbol: string;
  contractAddress: string;
  blockchain: Blockchains;
}) {
  const intl = useIntl();
  const logo = useLogo({ contractAddress, blockchain });

  console.log(contractAddress);
  console.log(logo);

  return (
    <Box>
      <Flex alignItems="center">
        {logo && <Image borderRadius="50%" src={logo} width="30px" height="30px" mr={2} />}
        <Text>
          {intl.formatNumber(amount as any)} {symbol}
        </Text>
      </Flex>
    </Box>
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
