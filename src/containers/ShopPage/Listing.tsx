import {
  Box,
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
  GridItem,
  SimpleGrid,
  useTheme,
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
import useCurrencySymbol from '../../hooks/useCurrencyAbbreviation';
import useDisplayNumber from '../../hooks/useDisplayNumber';
import useHexToRgb from '../../hooks/useHexToRgb';
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

  const intl = useIntl();
  const openSeaUrl = useOpenSeaUrl(address, token_id, blockchain);
  const formatPrice = useDisplayNumber(price, 18);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const loadingBalances = useAppSelector(selectLoadingBalances);
  const balances = useAppSelector(selectBalances);
  const { chainId } = useEthers();
  const url = useLogo({ blockchain });
  const symbol = useCurrencySymbol(blockchain);
  const theme = useTheme();
  const rgb = useHexToRgb(theme.colors.brand[400]);

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
              {`${formatPrice} ${symbol}`}
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
          <ModalHeader fontSize="lg" fontWeight="bold" textAlign="center">
            {name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Flex justifyContent="center">
                <Image alt={name} src={image} width={150} height={150} />
              </Flex>
              <Flex alignItems="center" mt={3}>
                <Heading as="h5" size="sm">
                  {intl.formatMessage({ id: 'nft-dialog-description', defaultMessage: 'Description' })}
                </Heading>
                <Box flexGrow={1} />
                <Link href={openSeaUrl} isExternal color="brand.400">
                  Opensea
                </Link>
              </Flex>
              <Text fontWeight="semibold" fontSize="md" noOfLines={3} mt={3}>
                {description}
              </Text>
              {attributes && attributes.length > 0 && (
                <>
                  <Heading as="h5" size="sm" my={3}>
                    {intl.formatMessage({ id: 'nft-dialog-attributes', defaultMessage: 'Attributes' })}
                  </Heading>
                  <SimpleGrid columns={3} spacing={3}>
                    {attributes.map(({ trait_type, value }, i) => (
                      <GridItem
                        key={i}
                        border={`1px solid ${theme.colors.brand[400]}`}
                        backgroundColor={`rgba(${rgb}, 0.05)`}
                        borderRadius="5px"
                        p={2}
                      >
                        <Text fontWeight="bold" textAlign="center" color="brand.400">
                          {trait_type}
                        </Text>
                        <Text fontWeight="semibold" textAlign="center">
                          {`${value}`}
                        </Text>
                      </GridItem>
                    ))}
                  </SimpleGrid>
                </>
              )}
              <Box mt={3}>
                <Flex>
                  <Text fontWeight="bold" fontSize="md" flexGrow={1}>
                    {intl.formatMessage({ id: 'nft-dialog-contract-address', defaultMessage: 'Contract Address' })}
                  </Text>
                  <Text fontWeight="semibold" fontSize="md">
                    {address.replace(address.substring(6, 38), '...')}
                  </Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" fontSize="md" flexGrow={1}>
                    {intl.formatMessage({ id: 'nft-dialog-token-id', defaultMessage: 'Token Id' })}
                  </Text>
                  <Text fontWeight="semibold" fontSize="md">
                    {token_id}
                  </Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" fontSize="md" flexGrow={1}>
                    {intl.formatMessage({ id: 'nft-dialog-blockchain', defaultMessage: 'Blockchain' })}
                  </Text>
                  <Text fontWeight="semibold" fontSize="md">
                    {blockchain}
                  </Text>
                </Flex>
                <Flex>
                  <Text fontWeight="bold" fontSize="md" flexGrow={1}>
                    {intl.formatMessage({ id: 'nft-dialog-token-standard', defaultMessage: 'Token Standard' })}
                  </Text>
                  <Text fontWeight="semibold" fontSize="md">
                    {interfaceName}
                  </Text>
                </Flex>
              </Box>
            </Box>
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
