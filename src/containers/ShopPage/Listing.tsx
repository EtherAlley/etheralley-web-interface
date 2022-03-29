import {
  Box,
  UnorderedList,
  ListItem,
  Text,
  Flex,
  Heading,
  Image,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import Settings from '../../common/settings';
import { Listing } from '../../common/types';
import Link from '../../components/Link';
import Paper from '../../components/Paper';
import useDisplayNumber from '../../hooks/useDisplayNumber';
import useOpenSeaUrl from '../../hooks/useOpenSeaUrl';

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
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <Paper p={3}>
        <Box>
          <Heading size="sm" textAlign="center" my={2} mx={2}>
            {name}
          </Heading>
          <Flex justifyContent="center">
            <Box as="button" onClick={() => setIsOpen(true)}>
              <Image alt={name} src={image} width={150} height={150} />
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="center" ml={6}>
            <Text fontWeight="bold" textAlign="center">
              {`${formatPrice} MATIC`}
            </Text>
            <Image
              alt={blockchain}
              src={`${Settings.PUBLIC_URL}/blockchains/${blockchain.toLowerCase()}.svg`}
              ml={2}
              height={6}
              width={6}
            />
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="profile.primary">
          <ModalHeader fontSize="lg" fontWeight="bold">
            {name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <Image alt={name} src={image} width={150} height={150} />
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
                Address: {address}
              </Text>
              <Text fontSize="md" noOfLines={3} mt={3}>
                Blockchain: {blockchain}
              </Text>
              <Text fontSize="md" noOfLines={3} mt={3}>
                Interface: {interfaceName}
              </Text>
            </>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ListingComponent;
