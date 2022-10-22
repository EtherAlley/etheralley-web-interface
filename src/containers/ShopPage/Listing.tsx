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
import { useState } from 'react';
import { useIntl } from 'react-intl';
import EtherAlleyStoreAbi from '../../abi/EtherAlleyStore';
import Settings from '../../common/settings';
import { Listing } from '../../common/types';
import Link from '../../components/Link';
import Logo from '../../components/Logo';
import Paper from '../../components/Paper';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import useCurrencySymbol from '../../hooks/useCurrencyAbbreviation';
import useDisplayNumber from '../../hooks/useDisplayNumber';
import useHexToRgb from '../../hooks/useHexToRgb';
import useOpenSeaUrl from '../../hooks/useOpenSeaUrl';
import useTrimmedString from '../../hooks/useTrimmedString';
import { purchase, selectBalances, selectLoadingBalances, selectSubmittingPurchase } from './slice';
import { useContract, useAccount, useNetwork, useSigner, useSwitchNetwork } from 'wagmi';
import { switchNetwork } from '../App/slice';

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
  const symbol = useCurrencySymbol(blockchain);
  const theme = useTheme();
  const rgb = useHexToRgb(theme.colors.brand[400]);
  const trimmedAddress = useTrimmedString(address);

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
            <Text fontWeight="bold" textAlign="center" mr={2}>
              {`${formatPrice} ${symbol}`}
            </Text>
            <Logo blockchain={blockchain} height={6} width={6} background={false} />
          </Flex>
          <PurchaseButton price={price} tokenId={token_id} quantity="1" index={index} />
        </Box>
      </Paper>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
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
                    {trimmedAddress}
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
  index,
}: {
  price: string;
  tokenId: string;
  quantity: string;
  index: number;
}) {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const loadingBalances = useAppSelector(selectLoadingBalances);
  const submittingPurchase = useAppSelector(selectSubmittingPurchase);
  const { address, isConnected } = useAccount();
  const balances = useAppSelector(selectBalances);
  const { data: signer } = useSigner();
  const contract = useContract({
    address: Settings.STORE_ADDRESS,
    abi: EtherAlleyStoreAbi,
    signerOrProvider: signer,
  });
  const { chain } = useNetwork();
  const { switchNetworkAsync, isLoading } = useSwitchNetwork();

  if (!address || !isConnected || !switchNetworkAsync || !signer) {
    return (
      <Button disabled colorScheme="brand" mt={3} width="100%">
        {intl.formatMessage({ id: 'connect-to-wallet', defaultMessage: 'Connect wallet' })}
      </Button>
    );
  }

  if (chain?.id !== Settings.CHAIN_ID) {
    return (
      <Button
        isLoading={isLoading}
        onClick={() => dispatch(switchNetwork({ switchNetworkAsync, chainId: Settings.CHAIN_ID }))}
        colorScheme="brand"
        mt={3}
        width="100%"
      >
        {intl.formatMessage({ id: 'switch-chains', defaultMessage: 'Switch to {name}' }, { name: 'Polygon' })}
      </Button>
    );
  }

  const hasPurchased = !loadingBalances && !!balances && balances[index] !== '0';

  return (
    <Button
      isLoading={loadingBalances || submittingPurchase}
      disabled={hasPurchased}
      onClick={() => dispatch(purchase({ contract, address, tokenId, price, quantity }))}
      colorScheme="brand"
      mt={3}
      width="100%"
    >
      <Text fontWeight="bold">
        <PurchaseButtonLabel price={price} hasPurchased={hasPurchased} />
      </Text>
    </Button>
  );
}

function PurchaseButtonLabel({ price, hasPurchased }: { price: string; hasPurchased: boolean }) {
  const intl = useIntl();

  if (hasPurchased) {
    return <>{intl.formatMessage({ id: 'item-owned', defaultMessage: 'Owned' })}</>;
  }

  if (price === '0') {
    return <>{intl.formatMessage({ id: 'claim', defaultMessage: 'Claim' })}</>;
  }

  return <>{intl.formatMessage({ id: 'purchase', defaultMessage: 'Purchase' })}</>;
}

export default ListingComponent;
