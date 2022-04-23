import { Box, Flex, Heading, Image, Link, Text } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { BADGE_HEIGHT, BADGE_WIDTH, Blockchains } from '../../../common/constants';
import useAppSelector from '../../../hooks/useAppSelector';
import useBlockchainLabel from '../../../hooks/useBlockchainLabel';
import useCurrencySymbol from '../../../hooks/useCurrencyAbbreviation';
import useDisplayNumber from '../../../hooks/useDisplayNumber';
import useEtherscanUrl from '../../../hooks/useEtherscanUrl';
import useLogo from '../../../hooks/useLogo';
import Coin from '../../../icons/Coin';
import { selectAddress, selectCurrency } from '../slice';
import Badge from './Badge';
import Chip from './Chip';

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
  const blockchainLabel = useBlockchainLabel(blockchain);
  const symbol = useCurrencySymbol(blockchain);

  return (
    <Box maxWidth="100%" maxHeight="100%">
      <Flex justifyContent="center" mb={5}>
        <CurrencyLogo blockchain={blockchain} />
      </Flex>
      <Heading as="h4" size="md" mt={2} textColor="profile.secondaryText">
        {blockchainLabel}
      </Heading>
      {displayBalance && <Chip text={`${displayBalance} ${symbol}`} />}
    </Box>
  );
}

function CurrencyHeader({ blockchain }: { blockchain: Blockchains }) {
  return (
    <Text textAlign="center" textColor="profile.secondaryText">
      Currency
    </Text>
  );
}

function CurrencyDialog({ blockchain, balance }: { blockchain: Blockchains; balance: string | undefined }) {
  const intl = useIntl();
  const displayBalance = useDisplayNumber(balance, 18);
  const address = useAppSelector(selectAddress);
  const etherscanUrl = useEtherscanUrl(blockchain, 'address', address);
  const symbol = useCurrencySymbol(blockchain);

  return (
    <>
      <Flex justifyContent="center">
        <CurrencyLogo blockchain={blockchain} />
      </Flex>
      <Flex alignItems="center" mt={3} mb={3}>
        <Box flexGrow={1} />
        <Link href={etherscanUrl} isExternal color="profile.accent">
          Etherscan
        </Link>
      </Flex>
      <Flex>
        <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
          {intl.formatMessage({ id: 'currency-dialog-balance', defaultMessage: 'Balance' })}
        </Text>
        <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
          {`${displayBalance} ${symbol}`}
        </Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
          {intl.formatMessage({ id: 'currency-dialog-blockchain', defaultMessage: 'Blockchain' })}
        </Text>
        <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
          {blockchain}
        </Text>
      </Flex>
    </>
  );
}

const coinStyling = {
  width: 85,
  height: 85,
  p: 2,
  backgroundColor: 'gray.900',
  borderRadius: '50%',
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

export default Currency;
