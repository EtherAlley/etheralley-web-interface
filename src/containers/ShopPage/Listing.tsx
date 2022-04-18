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
import { useEthers } from '@usedapp/core';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import Settings from '../../common/settings';
import { Listing } from '../../common/types';
import Link from '../../components/Link';
import Paper from '../../components/Paper';
import useAppSelector from '../../hooks/useAppSelector';
import useDisplayNumber from '../../hooks/useDisplayNumber';
import useLogo from '../../hooks/useLogo';
import useOpenSeaUrl from '../../hooks/useOpenSeaUrl';
import { purchase, selectBalances, selectLoadingBalances, selectSubmittingPurchase } from './slice';

function ListingComponent({ listing, index }: { listing: Listing; index: number }) {
  const {
    contract: { blockchain, interface: interfaceName, address },
    metadata: { name, description, image, attributes },
    info: { price },
    token_id,
  } = listing;

  const openSeaUrl = useOpenSeaUrl(address, token_id, blockchain);
  const formatPrice = useDisplayNumber(price, 18);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const loadingBalances = useAppSelector(selectLoadingBalances);
  const balances = useAppSelector(selectBalances);
  const { chainId } = useEthers();
  const url = useLogo({ blockchain });

  const hasPurchased = !loadingBalances && !!balances[index] && balances[index] !== '0';
  const correctChainId = chainId === Settings.STORE_CHAIN_ID;

  return (
    <>
      <Paper p={3} width="210px">
        <Box>
          <Heading size="sm" textAlign="center" my={2} mx={2}>
            {name}
          </Heading>
          <Flex justifyContent="center">
            <Box as="button" onClick={() => setIsOpen(true)}>
              <Image alt={name} src={image} width={150} height={150} />
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="center" ml={6} mt={2}>
            <Text fontWeight="bold" textAlign="center">
              {`${formatPrice} MATIC`}
            </Text>
            <Image alt={blockchain} src={url} ml={2} height={6} width={6} />
          </Flex>
          <PurchaseButton
            price={price}
            tokenId={token_id}
            quantity="1"
            hasPurchased={hasPurchased}
            correctChainId={correctChainId}
          />
        </Box>
      </Paper>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="gray.900">
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

function PurchaseButton({
  price,
  tokenId,
  quantity,
  hasPurchased,
  correctChainId,
}: {
  price: string;
  tokenId: string;
  quantity: string;
  hasPurchased: boolean;
  correctChainId: boolean;
}) {
  const dispatch = useDispatch();
  const { library, account } = useEthers();
  const loadingBalances = useAppSelector(selectLoadingBalances);
  const submittingPurchase = useAppSelector(selectSubmittingPurchase);

  return (
    <Button
      isLoading={!!account && (loadingBalances || submittingPurchase)}
      colorScheme="brand"
      mt={3}
      width="100%"
      disabled={!account || hasPurchased || !correctChainId}
      onClick={() => dispatch(purchase({ library, account: account!, tokenId, price, quantity }))}
    >
      <Text fontWeight="bold">
        <ButtonLabel price={price} hasPurchased={hasPurchased} correctChainId={correctChainId} />
      </Text>
    </Button>
  );
}

function ButtonLabel({
  price,
  hasPurchased,
  correctChainId,
}: {
  price: string;
  hasPurchased: boolean;
  correctChainId: boolean;
}) {
  const intl = useIntl();
  const { account } = useEthers();

  if (!account) {
    return <>{intl.formatMessage({ id: 'connect-to-wallet', defaultMessage: 'Connect wallet' })}</>;
  }

  if (!correctChainId) {
    return <>{intl.formatMessage({ id: 'switch-chains', defaultMessage: 'Switch to Polygon' })}</>;
  }

  if (hasPurchased) {
    return <>{intl.formatMessage({ id: 'item-owned', defaultMessage: 'Owned' })}</>;
  }

  if (price === '0') {
    return <>{intl.formatMessage({ id: 'claim', defaultMessage: 'Claim' })}</>;
  }

  return <>{intl.formatMessage({ id: 'purchase', defaultMessage: 'Purchase' })}</>;
}

export default ListingComponent;
