import { Flex, Image, Icon, Text, Link, ListItem, UnorderedList, Heading, Box, Center } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { NonFungibleToken } from '../../common/types';
import { BADGE_DIMENSION } from '../../common/constants';
import Badge from '../../components/Badge';
import useOpenSeaUrl from '../../hooks/useOpenSeaUrl';

function ImageWrapper({ image, alt, fallbackText }: { image: string; alt: string; fallbackText: string }) {
  return (
    <Flex height={BADGE_DIMENSION} widht={BADGE_DIMENSION}>
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
  data: {
    metadata: { image, name, description, attributes },
    contract: { address, blockchain, interface: interfaceName },
    token_id,
    balance,
  },
  usePaper = true,
  useHeader = true,
}: {
  data: NonFungibleToken;
  usePaper?: boolean;
  useHeader?: boolean;
}) {
  const openSeaUrl = useOpenSeaUrl(address, token_id, blockchain);

  return (
    <Badge
      width={BADGE_DIMENSION}
      height={useHeader ? BADGE_DIMENSION + 35 : BADGE_DIMENSION}
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
            <Link color="blue.500" href={openSeaUrl} isExternal>
              OpenSea <Icon as={RiExternalLinkLine}></Icon>
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
