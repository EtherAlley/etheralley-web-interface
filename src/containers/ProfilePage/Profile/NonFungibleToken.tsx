import { Flex, Image, Text, ListItem, UnorderedList, Heading, Box, Center } from '@chakra-ui/react';
import { BADGE_HEIGHT, BADGE_WIDTH } from '../../../common/constants';
import Badge from './Badge';
import useOpenSeaUrl from '../../../hooks/useOpenSeaUrl';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectNonFungibleToken } from './../slice';
import Link from '../../../components/Link';
import { Contract, NonFungibleMetadata } from '../../../common/types';
import Lock from '../../../icons/Lock';
import Paper from '../../../components/Paper';

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
    return (
      <Paper>
        <Flex width={BADGE_WIDTH} height={BADGE_HEIGHT} justifyContent="center" alignItems="center">
          <Lock width="80px" height="80px" />
        </Flex>
      </Paper>
    );
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
        <Heading size="sm" my={2} maxWidth="100%" noOfLines={1} mx={2}>
          {name}
        </Heading>
      )}
    </Box>
  );
}

function NonFungibleHeader({ metadata }: { metadata: NonFungibleMetadata | undefined }) {
  return <Heading>{metadata ? metadata.name : ''}</Heading>;
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

  // TODO: We can probably render more than this
  if (!metadata) {
    return <></>;
  }

  const { name, image, description, attributes } = metadata;

  return (
    <>
      <ImageWrapper image={image} alt={name} fallbackText={name} />
      {openSeaUrl && (
        <Link href={openSeaUrl} isExternal>
          Opensea
        </Link>
      )}
      <Text fontSize="md" noOfLines={3} mt={3}>
        {description}
      </Text>
      {attributes && attributes.length > 0 && (
        <>
          <Text fontSize="md" mt={3}>
            Attributes:
          </Text>
          <UnorderedList>
            {attributes.map(({ trait_type, value }, i) => (
              <ListItem key={i}>
                <Text>
                  {trait_type}: {value}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </>
      )}
      <Text fontSize="md" noOfLines={3} mt={3}>
        Balance: {balance}
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
