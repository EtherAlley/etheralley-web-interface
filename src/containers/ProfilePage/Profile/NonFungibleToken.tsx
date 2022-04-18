import { Flex, Image, Text, Heading, Box, Center, SimpleGrid, GridItem } from '@chakra-ui/react';
import { BADGE_HEIGHT, BADGE_WIDTH } from '../../../common/constants';
import Badge from './Badge';
import useOpenSeaUrl from '../../../hooks/useOpenSeaUrl';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectColors, selectNonFungibleToken } from './../slice';
import Link from '../../../components/Link';
import { Contract, NonFungibleMetadata } from '../../../common/types';
import Paper from './Paper';
import useHexToRgb from '../../../hooks/useHexToRgb';
import { useIntl } from 'react-intl';

function NonFungibleTokenComponent({
  index,
  usePaper = true,
  useHeader = true,
}: {
  index: number;
  usePaper?: boolean;
  useHeader?: boolean;
}) {
  const { metadata, contract, token_id, balance } = useAppSelector((state) => selectNonFungibleToken(state, index));

  // user does not own this nft. we should not display it as if they own it and instead display something slightly more aggressive
  if (balance === '0') {
    return <Paper width={BADGE_WIDTH} height={useHeader ? BADGE_HEIGHT : BADGE_WIDTH} />;
  }

  return (
    <Badge
      width={BADGE_WIDTH}
      height={useHeader ? BADGE_HEIGHT : BADGE_WIDTH}
      usePaper={usePaper}
      Display={<NonFungibleDisplay metadata={metadata} useHeader={useHeader} />}
      DialogHeader={<NonFungibleHeader metadata={metadata} />}
      DialogBody={<NonFungibleDialog token_id={token_id} metadata={metadata} contract={contract} balance={balance} />}
    />
  );
}

function NonFungibleDisplay({
  metadata,
  useHeader,
}: {
  metadata: NonFungibleMetadata | undefined;
  useHeader: boolean;
}) {
  // we more than likely failed to fetch the metadata. we should display gracefully here and simply return an empty display
  if (!metadata) {
    return <></>;
  }

  const { name, image } = metadata;

  return (
    <Box maxHeight="100%" maxWidth="100%">
      <ImageWrapper image={image} alt={name} fallbackText={name} />
      {useHeader && (
        <Heading size="sm" my={2} maxWidth="100%" noOfLines={1} mx={2} textColor="profile.secondaryText">
          {name}
        </Heading>
      )}
    </Box>
  );
}

function NonFungibleHeader({ metadata }: { metadata: NonFungibleMetadata | undefined }) {
  return (
    <Text textAlign="center" textColor="profile.secondaryText">
      {metadata ? metadata.name : ''}
    </Text>
  );
}

function NonFungibleDialog({
  token_id,
  contract,
  metadata,
  balance,
}: {
  token_id: string;
  contract: Contract;
  metadata: NonFungibleMetadata | undefined;
  balance: string | undefined;
}) {
  const { address, blockchain, interface: interfaceName } = contract;
  const openSeaUrl = useOpenSeaUrl(address, token_id, blockchain);
  const { accent } = useAppSelector(selectColors);
  const rgbAccent = useHexToRgb(accent);
  const intl = useIntl();

  // TODO: We can probably render more than this
  if (!metadata) {
    return <></>;
  }

  const { name, image, description, attributes } = metadata;

  return (
    <Box>
      <Flex justifyContent="center">
        <ImageWrapper image={image} alt={name} fallbackText={name} />
      </Flex>
      <Flex alignItems="center" mt={3}>
        <Heading as="h5" size="sm" textColor="profile.secondaryText">
          {intl.formatMessage({ id: 'nft-dialog-description', defaultMessage: 'Description' })}
        </Heading>
        <Box flexGrow={1} />
        <Link href={openSeaUrl} isExternal color="profile.accent">
          Opensea
        </Link>
      </Flex>
      <Text fontSize="md" noOfLines={3} mt={3} textColor="profile.secondaryText">
        {description}
      </Text>
      {attributes && attributes.length > 0 && (
        <>
          <Heading as="h5" size="sm" textColor="profile.secondaryText" my={3}>
            {intl.formatMessage({ id: 'nft-dialog-attributes', defaultMessage: 'Attributes' })}
          </Heading>
          <SimpleGrid columns={3} spacing={3}>
            {attributes.map(({ trait_type, value }, i) => (
              <GridItem
                key={i}
                border={`1px solid rgb(${rgbAccent})`}
                backgroundColor={`rgba(${rgbAccent},0.05)`}
                borderRadius="5px"
                p={2}
              >
                <Text textAlign="center" textColor="profile.accent">
                  {trait_type}
                </Text>
                <Text textAlign="center" textColor="profile.secondaryText">
                  {value.toString()}
                </Text>
              </GridItem>
            ))}
          </SimpleGrid>
        </>
      )}
      <Text fontSize="md" noOfLines={3} mt={3}>
        Balance: {balance}
      </Text>
      <Text fontSize="md" noOfLines={3} mt={3}>
        Contract Address: {address}
      </Text>
      <Text fontSize="md" noOfLines={3} mt={3}>
        Token Id: {token_id}
      </Text>
      <Text fontSize="md" noOfLines={3} mt={3}>
        Blockchain: {blockchain}
      </Text>
      <Text fontSize="md" noOfLines={3} mt={3}>
        Token Standard: {interfaceName}
      </Text>
    </Box>
  );
}

function ImageWrapper({ image, alt, fallbackText }: { image: string; alt: string; fallbackText: string }) {
  return (
    <Flex height={BADGE_WIDTH} width={BADGE_WIDTH}>
      <Image
        alt={alt}
        fallback={
          <Center width="100%">
            <Heading size="md">{fallbackText}</Heading>
          </Center>
        }
        src={image}
        margin="auto"
        maxWidth="100%"
        maxHeight="100%"
        borderRadius={8}
      />
    </Flex>
  );
}

export default NonFungibleTokenComponent;
