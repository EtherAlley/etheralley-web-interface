import { Flex, Image, Text, Heading, Box, SimpleGrid, GridItem, Spinner, Center } from '@chakra-ui/react';
import { BADGE_HEIGHT, BADGE_WIDTH } from '../../../common/constants';
import Badge from './Badge';
import useOpenSeaUrl from '../../../hooks/useOpenSeaUrl';
import useAppSelector from '../../../hooks/useAppSelector';
import { hideBadge, selectColors, selectNonFungibleToken } from './../slice';
import Link from '../../../components/Link';
import { Contract, NonFungibleMetadata } from '../../../common/types';
import useHexToRgb from '../../../hooks/useHexToRgb';
import { useIntl } from 'react-intl';
import useDisplayId from '../../../hooks/useDisplayId';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { useEffect } from 'react';

function NonFungibleTokenComponent({
  id,
  index,
  usePaper = true,
  useHeader = true,
}: {
  id: string;
  index: number;
  usePaper?: boolean;
  useHeader?: boolean;
}) {
  const dispatch = useAppDispatch();
  const { metadata, contract, token_id, balance } = useAppSelector((state) => selectNonFungibleToken(state, index));

  // Three scenarios to account for here:
  //  1. Nil metadata. Failing to fetch metadata can be transient or a miss configuration.
  //  2. Nil balance. Failing to fetch the balance can be transient or a miss configuration.
  //  3. Zero balance. The user does not own this nft.
  // We will opt to visually hide the badge from the screen in all three of these scenarios
  useEffect(() => {
    if (!metadata || !balance || balance === '0') {
      dispatch(hideBadge(id));
    }
  }, [id, metadata, balance, dispatch]);

  if (!metadata || !balance || balance === '0') {
    return <></>;
  }

  return (
    <Badge
      width={BADGE_WIDTH}
      height={useHeader ? BADGE_HEIGHT : BADGE_WIDTH}
      usePaper={usePaper}
      Display={<NonFungibleDisplay id={id} metadata={metadata} useHeader={useHeader} />}
      DialogHeader={<NonFungibleHeader metadata={metadata} />}
      DialogBody={<NonFungibleDialog token_id={token_id} metadata={metadata} contract={contract} balance={balance} />}
    />
  );
}

function NonFungibleDisplay({
  id,
  metadata,
  useHeader,
}: {
  id: string;
  metadata: NonFungibleMetadata;
  useHeader: boolean;
}) {
  const { name, image } = metadata;

  return (
    <Box maxHeight="100%" maxWidth="100%">
      <ImageWrapper image={image} id={id} />
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
  const trimmedAddress = useDisplayId(address);
  const trimmedTokenId = useDisplayId(token_id);

  // TODO: We can probably render more than this
  if (!metadata) {
    return <></>;
  }

  const { image, description, attributes } = metadata;

  return (
    <Box>
      <Flex justifyContent="center">
        <ImageWrapper image={image} />
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
      <Text fontWeight="semibold" fontSize="md" noOfLines={3} mt={3} textColor="profile.secondaryText">
        {description}
      </Text>
      {attributes && attributes.length > 0 && (
        <>
          <Heading as="h5" size="sm" textColor="profile.secondaryText" my={3}>
            {intl.formatMessage({ id: 'nft-dialog-attributes', defaultMessage: 'Attributes' })}
          </Heading>
          <SimpleGrid columns={3} spacing={3}>
            {attributes.map(({ trait_type, value, display_type }, i) => (
              <GridItem
                key={i}
                border={`1px solid ${accent}`}
                backgroundColor={`rgba(${rgbAccent},0.05)`}
                borderRadius="5px"
                p={2}
              >
                <Text fontWeight="bold" textAlign="center" textColor="profile.accent">
                  {trait_type}
                </Text>
                <AttributeValue value={value} display_type={display_type} />
              </GridItem>
            ))}
          </SimpleGrid>
        </>
      )}
      <Box mt={3}>
        <Flex>
          <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
            {intl.formatMessage({ id: 'nft-dialog-balance', defaultMessage: 'Balance' })}
          </Text>
          <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
            {balance}
          </Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
            {intl.formatMessage({ id: 'nft-dialog-contract-address', defaultMessage: 'Contract Address' })}
          </Text>
          <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
            {trimmedAddress}
          </Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
            {intl.formatMessage({ id: 'nft-dialog-token-id', defaultMessage: 'Token Id' })}
          </Text>
          <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
            {trimmedTokenId}
          </Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
            {intl.formatMessage({ id: 'nft-dialog-blockchain', defaultMessage: 'Blockchain' })}
          </Text>
          <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
            {blockchain}
          </Text>
        </Flex>
        <Flex>
          <Text fontWeight="bold" fontSize="md" textColor="profile.secondaryText" flexGrow={1}>
            {intl.formatMessage({ id: 'nft-dialog-token-standard', defaultMessage: 'Token Standard' })}
          </Text>
          <Text fontWeight="semibold" fontSize="md" textColor="profile.secondaryText">
            {interfaceName}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

// If we fail to load the image, we call hideBadge to visually hide the badge from display
// ImageWrapper is loaded by both the display and dialog component.
// We only want to call hide badge once per image so we will call it for the display load and not the dialog laod
// Hidden badges are respected in the group component
function ImageWrapper({ image, id }: { image: string; id?: string }) {
  const dispatch = useAppDispatch();
  return (
    <Flex height={BADGE_WIDTH} width={BADGE_WIDTH}>
      <Image
        alt=""
        fallback={
          <Center width="100%">
            <Spinner />
          </Center>
        }
        onError={() => {
          if (id) {
            dispatch(hideBadge(id));
          }
        }}
        src={image}
        margin="auto"
        maxWidth="100%"
        maxHeight="100%"
        borderRadius={8}
      />
    </Flex>
  );
}

function AttributeValue({
  value,
  display_type,
}: {
  value: string | number | boolean | undefined;
  display_type: string | number | boolean | undefined;
}) {
  const intl = useIntl();

  if (!!display_type && display_type === 'date' && typeof value === 'number') {
    return (
      <Text fontWeight="semibold" textAlign="center" textColor="profile.secondaryText">
        {intl.formatDate(value)}
      </Text>
    );
  }

  return (
    <Text fontWeight="semibold" textAlign="center" textColor="profile.secondaryText">
      {value}
    </Text>
  );
}

export default NonFungibleTokenComponent;
