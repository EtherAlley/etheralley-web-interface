import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { BADGE_HEIGHT, BADGE_WIDTH, Blockchains } from '../../../common/constants';
import useAppSelector from '../../../hooks/useAppSelector';
import useDisplayNumber from '../../../hooks/useDisplayNumber';
import useLogo from '../../../hooks/useLogo';
import Coin from '../../../icons/Coin';
import { selectCurrency } from '../slice';
import Badge from './Badge';
import BlockchainChip from './BlockchainChip';

function Currency({ index }: { index: number }) {
  const { blockchain, balance } = useAppSelector((state) => selectCurrency(state, index));

  return (
    <Badge
      width={BADGE_WIDTH}
      height={BADGE_HEIGHT}
      Display={<CurrencyDisplay blockchain={blockchain} balance={balance} />}
      DialogHeader={<CurrencyHeader blockchain={blockchain} />}
      DialogBody={<CurrencyDialog blockchain={blockchain} balance={balance} />}
    />
  );
}

function CurrencyDisplay({ blockchain, balance }: { blockchain: Blockchains; balance: string | undefined }) {
  const displayBalance = useDisplayNumber(balance, 18);
  return (
    <Box maxWidth="100%" maxHeight="100%">
      <Flex justifyContent="center" mb={5}>
        <CurrencyLogo blockchain={blockchain} />
      </Flex>
      {displayBalance && (
        <BlockchainChip text={`${displayBalance} ${currencyAbbreviation(blockchain)}`} blockchain={blockchain} />
      )}
    </Box>
  );
}

function CurrencyHeader({ blockchain }: { blockchain: Blockchains }) {
  return <Text>{blockchain}</Text>;
}

function CurrencyDialog({ blockchain, balance }: { blockchain: Blockchains; balance: string | undefined }) {
  const displayBalance = useDisplayNumber(balance, 18);
  return (
    <>
      <CurrencyLogo blockchain={blockchain} />
      <Text fontSize="md" noOfLines={3} mt={3}>
        Blockchain: {blockchain}
      </Text>
      <Text fontSize="md" noOfLines={3} mt={3}>
        Balance: {displayBalance}
      </Text>
    </>
  );
}

const coinStyling = {
  width: 85,
  height: 85,
  p: 2,
  backgroundColor: 'profile.primary',
  borderColor: 'profile.primary',
  borderRadius: '50%',
  boxShadow: 'dark-lg',
  borderWidth: '1px',
};

function CurrencyLogo({ blockchain }: { blockchain: Blockchains }) {
  const url = useLogo({ blockchain });
  return !url ? (
    <Box {...coinStyling}>
      <Coin width="85px" height="85px" />
    </Box>
  ) : (
    <Image alt={blockchain} src={url} {...coinStyling} />
  );
}

function currencyAbbreviation(blockchain: Blockchains): string {
  switch (blockchain) {
    case Blockchains.POLYGON:
      return 'MATIC';
    case Blockchains.ETHEREUM:
    case Blockchains.OPTIMISM:
    case Blockchains.ARBITRUM:
    default:
      return 'ETH';
  }
}

export default Currency;
