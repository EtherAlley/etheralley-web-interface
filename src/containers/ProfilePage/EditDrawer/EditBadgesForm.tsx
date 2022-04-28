import { Box, Flex, Button, Icon, Input, Text, Tooltip } from '@chakra-ui/react';
import { MdAdd, MdRemove, MdDragIndicator } from 'react-icons/md';
import { Droppable, Draggable, DraggingStyle } from 'react-beautiful-dnd';
import IconButton from '../../../components/IconButton';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  addGroup,
  removeGroup,
  removeItem,
  selectBadgeCount,
  selectCurrency,
  selectFungibleToken,
  selectGroups,
  selectNonFungibleToken,
  selectStatistic,
  selectStoreAssets,
  updateGroupText,
} from '../slice';
import { BadgeTypes, DisplayGroup, DisplayItem } from '../../../common/types';
import {
  Blockchains,
  Interfaces,
  PREMIUM_TOTAL_BADGE_COUNT,
  REGULAR_TOTAL_BADGE_COUNT,
} from '../../../common/constants';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { openBadgeModal } from '../ModalForms/slice';

function EditBadgesForm() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);
  const badgeCount = useAppSelector(selectBadgeCount);
  const { premium } = useAppSelector(selectStoreAssets);

  const maxBadgeCountReached =
    (!premium && badgeCount >= REGULAR_TOTAL_BADGE_COUNT) || (premium && badgeCount >= PREMIUM_TOTAL_BADGE_COUNT);
  const label =
    premium && badgeCount >= PREMIUM_TOTAL_BADGE_COUNT
      ? intl.formatMessage(
          {
            id: 'premium-max-badge-count-form',
            defaultMessage: '{max} badges is the maximum number for a premium account',
          },
          { max: PREMIUM_TOTAL_BADGE_COUNT }
        )
      : intl.formatMessage(
          {
            id: 'regular-max-badge-count-form',
            defaultMessage:
              '{max} badges is the maximum number for a regular account. Purchase premium from the store to access a higher badge count',
          },
          { max: REGULAR_TOTAL_BADGE_COUNT }
        );

  return (
    <Box>
      <Flex>
        <Box flexGrow={1} />
        <Tooltip label={label} shouldWrapChildren isDisabled={!maxBadgeCountReached}>
          <Button
            onClick={() => dispatch(openBadgeModal())}
            my={5}
            mr={2}
            colorScheme="brand"
            variant="outline"
            rightIcon={<Icon as={MdAdd} />}
            disabled={maxBadgeCountReached}
          >
            {intl.formatMessage({ id: 'add-badge', defaultMessage: 'Add Badge' })}
          </Button>
        </Tooltip>
        <Button
          onClick={() => dispatch(addGroup())}
          my={5}
          colorScheme="brand"
          variant="outline"
          rightIcon={<Icon as={MdAdd} />}
        >
          {intl.formatMessage({ id: 'add-group', defaultMessage: 'Add Group' })}
        </Button>
      </Flex>
      {groups.map((group, i) => {
        return <Group key={group.id} group={group} arrayIndex={i} />;
      })}
    </Box>
  );
}

function Group({ group, arrayIndex }: { group: DisplayGroup; arrayIndex: number }) {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { id, items, text } = group;

  return (
    <Box>
      <Flex alignItems="end" mr={2}>
        <Input
          id={id}
          value={text}
          onChange={(event) => dispatch(updateGroupText({ index: arrayIndex, text: event.target.value }))}
          maxLength={30}
        />
        <IconButton
          aria-label={intl.formatMessage({ id: 'remove-group', defaultMessage: 'Remove Group' })}
          tooltip={intl.formatMessage({ id: 'remove-group', defaultMessage: 'Remove Group' })}
          Icon={MdRemove}
          onClick={() => dispatch(removeGroup(arrayIndex))}
          size="md"
          variant="solid"
          bg="gray.700"
          iconColor="red.300"
        />
      </Flex>
      <Droppable droppableId={`${arrayIndex}`}>
        {(providedDroppable, snapshot) => (
          <Box
            {...providedDroppable.droppableProps}
            ref={providedDroppable.innerRef}
            my="16px"
            width="100%"
            borderRadius={8}
            bg={snapshot.isDraggingOver ? 'green.300' : 'gray.700'}
          >
            {items.map((item, i) => {
              return <Item key={item.id} item={item} groupArrayIndex={arrayIndex} itemArrayIndex={i} />;
            })}
            {providedDroppable.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
}

function Item({
  item,
  itemArrayIndex,
  groupArrayIndex,
}: {
  item: DisplayItem;
  itemArrayIndex: number;
  groupArrayIndex: number;
}) {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { id, type, index } = item;

  let label: ReactNode;
  switch (type) {
    case BadgeTypes.FungibleToken:
      label = <FungibleLabel index={index} />;
      break;
    case BadgeTypes.NonFungibleToken:
      label = <NonFungibleLabel index={index} />;
      break;
    case BadgeTypes.Statistics:
      label = <StatisticLabel index={index} />;
      break;
    case BadgeTypes.Currencies:
      label = <CurrencyLabel index={index} />;
      break;
    default:
      label = <Text isTruncated>{type}</Text>;
      break;
  }

  return (
    <Draggable draggableId={id} index={itemArrayIndex}>
      {(providedDraggable, snapshot) => {
        // This is to fix the x position of the element being dragged while inside the drawer modal
        if (snapshot.isDragging && providedDraggable.draggableProps.style) {
          const style = providedDraggable.draggableProps.style as DraggingStyle;
          style.left = 50;
        }
        return (
          <Flex
            ref={providedDraggable.innerRef}
            {...providedDraggable.draggableProps}
            {...providedDraggable.dragHandleProps}
            userSelect="none"
            padding="8px"
            my="8px"
            borderRadius={8}
            bg="gray.800"
            alignItems="center"
            style={{ ...providedDraggable.draggableProps.style }}
          >
            <Box>
              <Icon as={MdDragIndicator} mr={2} mt={2} w={6} h={6} />
            </Box>
            {label}
            <Box flexGrow={1}></Box>
            <IconButton
              aria-label={intl.formatMessage({ id: 'aria-remove-item', defaultMessage: 'Remove Item' })}
              tooltip={intl.formatMessage({ id: 'remove-item', defaultMessage: 'Remove Item' })}
              Icon={MdRemove}
              onClick={() => dispatch(removeItem({ groupArrayIndex, itemArrayIndex }))}
              size="md"
              variant="solid"
              bg="gray.800"
              iconColor="red.300"
              ml={2}
            />
          </Flex>
        );
      }}
    </Draggable>
  );
}

function NonFungibleLabel({ index }: { index: number }) {
  const intl = useIntl();
  const nft = useAppSelector((state) => selectNonFungibleToken(state, index));

  if (!nft.metadata || !nft.metadata.name) {
    return <Text isTruncated>{intl.formatMessage({ id: 'nft-fallback', defaultMessage: 'Non Fungible Token' })}</Text>;
  }

  return <Text isTruncated>{nft.metadata.name}</Text>;
}

function FungibleLabel({ index }: { index: number }) {
  const intl = useIntl();
  const token = useAppSelector((state) => selectFungibleToken(state, index));

  if (!token.metadata.name) {
    return <Text isTruncated>{intl.formatMessage({ id: 'token-fallback', defaultMessage: 'Fungible Token' })}</Text>;
  }

  return <Text isTruncated>{token.metadata.name}</Text>;
}

function StatisticLabel({ index }: { index: number }) {
  const intl = useIntl();
  const stat = useAppSelector((state) => selectStatistic(state, index));

  switch (stat.contract.interface) {
    case Interfaces.SUSHISWAP_EXCHANGE:
      return <Text isTruncated>Sushiswap {intl.formatMessage({ id: 'stats', defaultMessage: 'Stats' })}</Text>;
    case Interfaces.UNISWAP_V2_EXCHANGE:
      return <Text isTruncated>Uniswap V2 {intl.formatMessage({ id: 'stats', defaultMessage: 'Stats' })}</Text>;
    case Interfaces.UNISWAP_V3_EXCHANGE:
      return <Text isTruncated>Uniswap V3 {intl.formatMessage({ id: 'stats', defaultMessage: 'Stats' })}</Text>;
    case Interfaces.ROCKET_POOL:
      return <Text isTruncated>Rocket Pool {intl.formatMessage({ id: 'rewards', defaultMessage: 'Rewards' })}</Text>;
    default:
      return <Text isTruncated>{stat.contract.interface}</Text>;
  }
}

function CurrencyLabel({ index }: { index: number }) {
  const currency = useAppSelector((state) => selectCurrency(state, index));

  switch (currency.blockchain) {
    case Blockchains.ETHEREUM:
      return <Text isTruncated>Mainnet Ether</Text>;
    case Blockchains.ARBITRUM:
      return <Text isTruncated>Arbitrum Ether</Text>;
    case Blockchains.OPTIMISM:
      return <Text isTruncated>Optimism Ether</Text>;
    case Blockchains.POLYGON:
      return <Text isTruncated>Matic</Text>;
    default:
      return <Text isTruncated>{currency.blockchain}</Text>;
  }
}

export default EditBadgesForm;
