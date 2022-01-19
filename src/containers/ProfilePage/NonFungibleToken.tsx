import { Flex, Image, Icon, Text, Link, ListItem, UnorderedList, Heading, Box } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { NonFungibleToken } from '../../api/types';
import { Blockchains } from '../../common/constants';
import Settings from '../../common/settings';
import Badge from '../../components/Badge';

function getOpenSeaUrl(address: string, token_id: string, blockchain: Blockchains): string {
  switch (blockchain) {
    case Blockchains.ETHEREUM:
    case Blockchains.POLYGON:
      return `${Settings.OPENSEA_URL}/assets/${address}/${token_id}`;
    default:
      return '';
  }
}

function NonFungibleTokenComponent({
  metadata: { image, name, description, attributes },
  contract: { address, blockchain, interface: interfaceName },
  token_id,
  balance,
}: NonFungibleToken) {
  const openSeaUrl = getOpenSeaUrl(address, token_id, blockchain);

  return (
    <Badge
      Display={
        <Box height={200}>
          <Flex width={165} height={165}>
            <Image alt={name} src={image} margin="auto" maxWidth="100%" maxHeight="100%" borderRadius={8} />
          </Flex>
          <Heading size="sm" my={2} maxWidth={165} noOfLines={1} mx={2}>
            {name}
          </Heading>
        </Box>
      }
      DialogHeader={name}
      DialogBody={
        <>
          <Flex width={165} height={165}>
            <Image alt={name} src={image} margin="auto" maxWidth="100%" maxHeight="100%" borderRadius={8} />
          </Flex>
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
