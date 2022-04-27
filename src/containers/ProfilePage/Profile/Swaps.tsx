import { Box, Flex, OrderedList, ListItem, Text, Heading, Icon } from '@chakra-ui/react';
import Badge from './Badge';
import { Contract, Swap } from '../../../common/types';
import useEtherscanUrl from '../../../hooks/useEtherscanUrl';
import { BADGE_HEIGHT, BADGE_WIDTH, Blockchains, Interfaces } from '../../../common/constants';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectStatistic } from './../slice';
import Link from '../../../components/Link';
import Chip from './Chip';
import { useIntl } from 'react-intl';
import Logo from '../../../components/Logo';
import { MdSwapHoriz } from 'react-icons/md';
import useDisplayNumber from '../../../hooks/useDisplayNumber';
import Divider from './Divider';

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

function SwapDisplay({ swaps, contract }: { swaps: Swap[] | undefined; contract: Contract }) {
  const intl = useIntl();

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
        <Logo interfaceName={contract.interface} />
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

  return (
    <Text textAlign="center" textColor="profile.secondaryText">
      {intl.formatMessage({ id: 'top-swaps', defaultMessage: 'Top Swaps' })}
    </Text>
  );
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
          <Divider my={2} />
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
    <ListItem fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
      <Flex mb={2}>
        <Text ml={2}>
          {intl.formatNumber(Number.parseFloat(amountUSD), { style: 'currency', currency: 'USD' })} USD
        </Text>
        <Box flexGrow={1} />
        <Link href={etherscanUrl} isExternal color="profile.accent">
          Etherscan
        </Link>
      </Flex>
      <Flex alignItems="center" height={50}>
        <SwapToken amount={input.amount} symbol={input.symbol} contractAddress={input.id} blockchain={blockchain} />
        <Icon as={MdSwapHoriz} w={7} h={7} mr={7} />
        <SwapToken amount={output.amount} symbol={output.symbol} contractAddress={output.id} blockchain={blockchain} />
      </Flex>
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
  const displayAmount = useDisplayNumber(amount, 0);

  return (
    <Flex alignItems="center" width={170}>
      <Logo contractAddress={contractAddress} blockchain={blockchain} width={7} height={7} />
      <Text ml={2} isTruncated>
        {displayAmount} {symbol}
      </Text>
    </Flex>
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
