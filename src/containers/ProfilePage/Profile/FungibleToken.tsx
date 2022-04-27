import { Text, Box, Flex, Heading } from '@chakra-ui/react';
import Badge from './Badge';
import useDisplayNumber from '../../../hooks/useDisplayNumber';
import useEtherscanUrl from '../../../hooks/useEtherscanUrl';
import { BADGE_HEIGHT, BADGE_WIDTH } from '../../../common/constants';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectAddress, selectFungibleToken } from './../slice';
import Link from '../../../components/Link';
import Chip from './Chip';
import { Contract, FungibleMetadata } from '../../../common/types';
import { useIntl } from 'react-intl';
import Logo from '../../../components/Logo';
import useTrimmedString from '../../../hooks/useTrimmedString';

function FungibleTokenComponent({ index }: { index: number }) {
  const { metadata, contract, balance } = useAppSelector((state) => selectFungibleToken(state, index));

  return (
    <Badge
      width={BADGE_WIDTH}
      height={BADGE_HEIGHT}
      Display={<FungibleDisplay metadata={metadata} contract={contract} balance={balance} />}
      DialogHeader={<FungibleHeader name={metadata.name} />}
      DialogBody={<FungibleDialog metadata={metadata} contract={contract} balance={balance} />}
    />
  );
}

function FungibleDisplay({
  metadata: { symbol, decimals, name },
  contract: { address, blockchain },
  balance,
}: {
  contract: Contract;
  metadata: FungibleMetadata;
  balance: string | undefined;
}) {
  const displayBalance = useDisplayNumber(balance, decimals);
  return (
    <Box maxWidth="100%" maxHeight="100%">
      <Flex justifyContent="center" mb={5}>
        <Logo contractAddress={address} blockchain={blockchain} />
      </Flex>
      <Heading as="h4" size="md" mt={2} textColor="profile.secondaryText">
        {name}
      </Heading>
      {displayBalance && <Chip text={`${displayBalance} ${symbol ?? ''}`} />}
    </Box>
  );
}

function FungibleHeader({ name }: { name: string | undefined }) {
  return (
    <Text textAlign="center" textColor="profile.secondaryText">
      {name ?? ''}
    </Text>
  );
}

function FungibleDialog({
  metadata: { symbol, decimals },
  contract: { address: contractAddress, blockchain, interface: interfaceName },
  balance,
}: {
  contract: Contract;
  metadata: FungibleMetadata;
  balance: string | undefined;
}) {
  const intl = useIntl();
  const address = useAppSelector(selectAddress);
  const etherscanUrl = useEtherscanUrl(blockchain, 'token', `${contractAddress}?a=${address}`);
  const displayBalance = useDisplayNumber(balance, decimals);
  const trimmedAddress = useTrimmedString(contractAddress);

  return (
    <Box>
      <Flex justifyContent="center">
        <Logo contractAddress={contractAddress} blockchain={blockchain} />
      </Flex>
      <Flex alignItems="center" mt={3} mb={3}>
        <Box flexGrow={1} />
        <Link href={etherscanUrl} isExternal color="profile.accent">
          Etherscan
        </Link>
      </Flex>
      <Flex>
        <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
          {intl.formatMessage({ id: 'token-dialog-balance', defaultMessage: 'Balance' })}
        </Text>
        <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
          {`${displayBalance} ${symbol}`}
        </Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
          {intl.formatMessage({ id: 'token-dialog-contract-address', defaultMessage: 'Contract Address' })}
        </Text>
        <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
          {trimmedAddress}
        </Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
          {intl.formatMessage({ id: 'token-dialog-blockchain', defaultMessage: 'Blockchain' })}
        </Text>
        <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
          {blockchain}
        </Text>
      </Flex>
      <Flex>
        <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
          {intl.formatMessage({ id: 'token-dialog-token-standard', defaultMessage: 'Token Standard' })}
        </Text>
        <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
          {interfaceName}
        </Text>
      </Flex>
    </Box>
  );
}

export default FungibleTokenComponent;
