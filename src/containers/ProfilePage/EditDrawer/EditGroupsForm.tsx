import { Box, Flex, Button, Icon, Input, Text } from '@chakra-ui/react';
import { MdAdd, MdRemove, MdDragIndicator } from 'react-icons/md';
import { Droppable, Draggable, DraggingStyle } from 'react-beautiful-dnd';
import IconButton from '../../../components/IconButton';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  addGroup,
  openBadgeForm,
  removeGroup,
  removeItem,
  selectFungibleToken,
  selectGroups,
  selectNonFungibleToken,
  selectStatistic,
  updateGroupText,
} from '../slice';
import { BadgeTypes, DisplayGroup, DisplayItem } from '../../../common/types';
import { Interfaces, StatisticTypes } from '../../../common/constants';
import { ReactNode } from 'react';
import { useIntl } from 'react-intl';

function EditGroupsForm() {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);

  return (
    <Box>
      <Flex>
        <Box flexGrow={1} />
        <Button
          onClick={() => dispatch(addGroup())}
          my={5}
          colorScheme="green"
          variant="outline"
          rightIcon={<Icon as={MdAdd} />}
        >
          Add Group
        </Button>
      </Flex>
      {groups.map((group, i) => {
        return <Group key={group.id} group={group} arrayIndex={i} />;
      })}
    </Box>
  );
}

function Group({ group, arrayIndex }: { group: DisplayGroup; arrayIndex: number }) {
  const dispatch = useAppDispatch();
  const { id, items, text } = group;

  return (
    <Box>
      <Flex alignItems="end" mr={2}>
        <Input
          id={id}
          label={`Group ${arrayIndex + 1}`}
          value={text}
          onChange={(event) => dispatch(updateGroupText({ index: arrayIndex, text: event.target.value }))}
          maxLength={30}
        />
        <IconButton
          aria-label="Add Item"
          tooltip="Add Item"
          Icon={MdAdd}
          onClick={() => dispatch(openBadgeForm())}
          size="md"
          variant="solid"
          bg="gray.700"
          iconColor="green.300"
        />
        <IconButton
          aria-label="Remove Group"
          tooltip="Remove Group"
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
              aria-label="Remove Item"
              tooltip="Remove Item"
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
      return (
        <Text isTruncated>{intl.formatMessage({ id: 'sushi-swap-stats', defaultMessage: 'Sushiswap Stats' })}</Text>
      );
    case Interfaces.UNISWAP_V2_EXCHANGE:
    case Interfaces.UNISWAP_V3_EXCHANGE:
      return <Text isTruncated>{intl.formatMessage({ id: 'sushi-swap-stats', defaultMessage: 'Uniswap Stats' })}</Text>;
    default:
      return <Text isTruncated>{stat.contract.interface}</Text>;
  }
}

export default EditGroupsForm;
