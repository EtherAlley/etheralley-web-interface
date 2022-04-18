import { Image, Text, Box, Flex, Heading } from '@chakra-ui/react';
import Badge from './Badge';
import useDisplayNumber from '../../../hooks/useDisplayNumber';
import useEtherscanUrl from '../../../hooks/useEtherscanUrl';
import { BADGE_HEIGHT, BADGE_WIDTH, Blockchains } from '../../../common/constants';
import Coin from '../../../icons/Coin';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectFungibleToken } from './../slice';
import Link from '../../../components/Link';
import BlockchainChip from './BlockchainChip';
import { Contract, FungibleMetadata } from '../../../common/types';
import useLogo from '../../../hooks/useLogo';

function FungibleTokenComponent({ index }: { index: number }) {
  const { metadata, contract, balance } = useAppSelector((state) => selectFungibleToken(state, index));

  return (
    <Badge
      width={BADGE_WIDTH}
      height={BADGE_HEIGHT}
      Display={<FungibleDisplay metadata={metadata} contract={contract} balance={balance} />}
      DialogHeader={<FungibleHeader name={metadata.name} />}
      DialogBody={<FungibleDialog metadata={metadata} contract={contract} />}
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
        <FungibleLogo address={address} blockchain={blockchain} symbol={symbol} />
      </Flex>
      <Heading as="h4" size="md" mt={2} textColor="profile.secondaryText">
        {name}
      </Heading>
      {displayBalance && <BlockchainChip text={`${displayBalance} ${symbol ?? ''}`} blockchain={blockchain} />}
    </Box>
  );
}

function FungibleHeader({ name }: { name: string | undefined }) {
  return <Text>{name ?? ''}</Text>;
}

function FungibleDialog({
  metadata: { symbol, name },
  contract: { address, blockchain, interface: interfaceName },
}: {
  contract: Contract;
  metadata: FungibleMetadata;
}) {
  const etherscanUrl = useEtherscanUrl(blockchain, 'address', address);

  return (
    <>
      <FungibleLogo address={address} blockchain={blockchain} symbol={symbol} />
      <Link href={etherscanUrl} isExternal>
        Etherscan
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
  );
}

const coinStyling = {
  width: 85,
  height: 85,
  borderRadius: '50%',
  borderWidth: '0px',
};

function FungibleLogo({
  address,
  blockchain,
  symbol,
}: {
  address: string;
  blockchain: Blockchains;
  symbol: string | undefined;
}) {
  const url = useLogo({ contractAddress: address, blockchain });
  return !url ? (
    <Box {...coinStyling}>
      <Coin width="85px" height="85px" />
    </Box>
  ) : (
    <Image alt={symbol} src={url} {...coinStyling} />
  );
}

export default FungibleTokenComponent;
