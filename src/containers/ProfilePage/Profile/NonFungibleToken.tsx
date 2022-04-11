import { Flex, Image, Text, ListItem, UnorderedList, Heading, Box, Center } from '@chakra-ui/react';
import { BADGE_HEIGHT, BADGE_WIDTH } from '../../../common/constants';
import Badge from '../../../components/Badge';
import useOpenSeaUrl from '../../../hooks/useOpenSeaUrl';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectNonFungibleToken } from './../slice';
import Link from '../../../components/Link';

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

function NonFungibleTokenComponent({
  index,
  usePaper = true,
  useHeader = true,
}: {
  index: number;
  usePaper?: boolean;
  useHeader?: boolean;
}) {
  const {
    metadata,
    contract: { address, blockchain, interface: interfaceName },
    token_id,
    balance,
  } = useAppSelector((state) => selectNonFungibleToken(state, index));
  const openSeaUrl = useOpenSeaUrl(address, token_id, blockchain);

  if (!metadata || !balance || balance === '0') {
    return <></>;
  }

  const { name, image, description, attributes } = metadata;

  return (
    <Badge
      width={BADGE_WIDTH}
      height={useHeader ? BADGE_HEIGHT : BADGE_WIDTH}
      usePaper={usePaper}
      Display={
        <Box maxHeight="100%" maxWidth="100%">
          <ImageWrapper image={image} alt={name} fallbackText={interfaceName} />
          {useHeader && (
            <Heading size="sm" my={2} maxWidth="100%" noOfLines={1} mx={2}>
              {name}
            </Heading>
          )}
        </Box>
      }
      DialogHeader={name}
      DialogBody={
        <>
          <ImageWrapper image={image} alt={name} fallbackText={interfaceName} />
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
      }
    />
  );
}

export default NonFungibleTokenComponent;
