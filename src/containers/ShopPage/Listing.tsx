import { Box, UnorderedList, ListItem, Text, Center, Flex, Heading, Image, Button } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { Listing } from '../../common/types';
import Badge from '../../components/Badge';
import BlockcahinChip from '../../components/BlockchainChip';
import Link from '../../components/Link';
import Paper from '../../components/Paper';
import useDisplayNumber from '../../hooks/useDisplayNumber';
import useOpenSeaUrl from '../../hooks/useOpenSeaUrl';

function ImageWrapper({ image, alt, fallbackText }: { image: string; alt: string; fallbackText: string }) {
  return (
    <Flex>
      <Image
        alt={alt}
        fallback={
          <Center width="100%">
            <Heading size="md">{fallbackText}</Heading>
          </Center>
        }
        src={image}
        margin="auto"
        width={150}
        height={150}
        borderRadius={8}
      />
    </Flex>
  );
}

function ListingComponent({ listing }: { listing: Listing }) {
  const {
    contract: { blockchain, interface: interfaceName, address },
    metadata: { name, description, image, attributes },
    info: { purchasable, transferable, price, supply_limit, balance_limit },
    token_id,
  } = listing;
  const intl = useIntl();
  const openSeaUrl = useOpenSeaUrl(address, token_id, blockchain);
  const formatPrice = useDisplayNumber(price, 18);

  return (
    <Paper p={3}>
      <Box>
        <ImageWrapper image={image} alt={name} fallbackText={name} />
        <Heading size="sm" textAlign="center" my={2} mx={2}>
          {name}
        </Heading>
        <Flex justifyContent="center">
          <BlockcahinChip text={`${formatPrice} MATIC`} blockchain={blockchain} />
        </Flex>
        <Button colorScheme="brand" mt={3} width="100%">
          <Text fontWeight="bold">
            {price === '0'
              ? intl.formatMessage({ id: 'claim', defaultMessage: 'Claim' })
              : intl.formatMessage({ id: 'purchase', defaultMessage: 'Purchase' })}
          </Text>
        </Button>
      </Box>
    </Paper>
  );

  // return (
  //   <Badge
  //     width={200}
  //     height={260}
  //     useHover={false}
  //     Display={
  //       <Box maxHeight="100%" maxWidth="100%">
  //         <ImageWrapper image={image} alt={name} fallbackText={interfaceName} />
  //         <Heading size="sm" my={2} maxWidth="100%" noOfLines={1} mx={2} mb={3}>
  //           {name}
  //         </Heading>
  //         <Button colorScheme="brand">Purchase</Button>
  //       </Box>
  //     }
  //     DialogHeader={name}
  //     DialogBody={
  //       <>
  //         <ImageWrapper image={image} alt={name} fallbackText={interfaceName} />
  //         {openSeaUrl && (
  //           <Link href={openSeaUrl} isExternal>
  //             Opensea
  //           </Link>
  //         )}
  //         <Text fontSize="md" noOfLines={3} mt={3}>
  //           {description}
  //         </Text>
  //         {attributes && attributes.length > 0 && (
  //           <>
  //             <Text fontSize="md" mt={3}>
  //               Attributes:
  //             </Text>
  //             <UnorderedList>
  //               {attributes.map(({ trait_type, value }, i) => (
  //                 <ListItem key={i}>
  //                   <Text>
  //                     {trait_type}: {value}
  //                   </Text>
  //                 </ListItem>
  //               ))}
  //             </UnorderedList>
  //           </>
  //         )}
  //         <Text fontSize="md" noOfLines={3} mt={3}>
  //           Address: {address}
  //         </Text>
  //         <Text fontSize="md" noOfLines={3} mt={3}>
  //           Blockchain: {blockchain}
  //         </Text>
  //         <Text fontSize="md" noOfLines={3} mt={3}>
  //           Interface: {interfaceName}
  //         </Text>
  //       </>
  //     }
  //   />
  //);
}

export default ListingComponent;
