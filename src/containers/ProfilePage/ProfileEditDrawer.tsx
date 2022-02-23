import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Box,
  Icon,
  Text,
  Flex,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { ProfileMode } from '../../common/constants';
import AccordionComponent from '../../components/Accordion';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import useAppDispatch from '../../hooks/useAppDispatch';
import { Droppable, Draggable, DraggingStyle } from 'react-beautiful-dnd';
import useAppSelector from '../../hooks/useAppSelector';
import {
  saveProfile,
  selectColors,
  selectText,
  selectProfileMode,
  setProfileMode,
  updatePrimaryColor,
  updatePrimaryTextColor,
  updateProfileDescription,
  updateProfileTitle,
  updateSecondaryColor,
  updateSecondaryTextColor,
  selectGroups,
  updateGroupText,
} from './slice';
import { MdAdd, MdDragIndicator, MdRemove } from 'react-icons/md';
import IconButton from '../../components/IconButton';

function ProfileEditDrawer() {
  const profileMode = useAppSelector(selectProfileMode);
  const dispatch = useAppDispatch();
  const { account, library } = useWeb3React();
  const cancelEditMode = () => dispatch(setProfileMode(ProfileMode.View));

  return (
    <Drawer size="md" isOpen={profileMode === ProfileMode.Edit} onClose={cancelEditMode} placement="right">
      <DrawerContent>
        <DrawerCloseButton onClick={cancelEditMode} />

        <DrawerHeader>Edit your profile</DrawerHeader>

        <DrawerBody>
          <AccordionComponent
            items={[
              { header: 'Info', body: <EditInfoForm /> },
              { header: 'Colors', body: <EditColorsForm /> },
              { header: 'Groups', body: <EditGroupsForm /> },
            ]}
          />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" colorScheme="red" mr={3} onClick={cancelEditMode}>
            Cancel
          </Button>
          <Button colorScheme="brand" onClick={() => dispatch(saveProfile({ address: account!, library }))}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function EditInfoForm() {
  const dispatch = useAppDispatch();
  const { title, description } = useAppSelector(selectText);

  return (
    <>
      <Input
        id="title"
        label="Title"
        value={title}
        onChange={(event) => dispatch(updateProfileTitle(event.target.value))}
        maxLength={40}
      />
      <TextArea
        id="test"
        label="Description"
        value={description}
        onChange={(event) => dispatch(updateProfileDescription(event.target.value))}
        maxLength={500}
        height={400}
      />
    </>
  );
}

function EditColorsForm() {
  const dispatch = useAppDispatch();
  const { primary, secondary, primaryText, secondaryText } = useAppSelector(selectColors);

  return (
    <>
      <Input
        id="primaryColor"
        label="Primary"
        value={primary}
        onChange={(event) => dispatch(updatePrimaryColor(event.target.value))}
        maxLength={15}
      />
      <Input
        id="secondaryColor"
        label="Secondary"
        value={secondary}
        onChange={(event) => dispatch(updateSecondaryColor(event.target.value))}
        maxLength={15}
        mt={4}
      />
      <Input
        id="primaryText"
        label="Primary Text"
        value={primaryText}
        maxLength={15}
        onChange={(event) => dispatch(updatePrimaryTextColor(event.target.value))}
        mt={4}
      />
      <Input
        id="secondaryText"
        label="Secondary Text"
        value={secondaryText}
        maxLength={15}
        onChange={(event) => dispatch(updateSecondaryTextColor(event.target.value))}
        mt={4}
      />
    </>
  );
}

function EditGroupsForm() {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(selectGroups);

  return (
    <Box>
      <Flex>
        <Box flexGrow={1} />
        <Button mt={5} colorScheme="green" variant="outline" rightIcon={<Icon as={MdAdd} />}>
          Add Group
        </Button>
      </Flex>
      {groups.map(({ id, items, text }, i) => {
        return (
          <Box key={id}>
            <Flex alignItems="end">
              <Input
                id={id}
                label={`Group ${i + 1}`}
                value={text}
                onChange={(event) => dispatch(updateGroupText({ index: i, text: event.target.value }))}
                maxLength={30}
              />
              <IconButton
                aria-label="Add Item"
                tooltip="Add Item"
                Icon={MdAdd}
                onClick={() => {}}
                size="md"
                variant="solid"
                bg="gray.700"
                iconColor="green.300"
              />
              <IconButton
                aria-label="Remove Group"
                tooltip="Remove Group"
                Icon={MdRemove}
                onClick={() => {}}
                size="md"
                variant="solid"
                bg="gray.700"
                iconColor="red.300"
              />
            </Flex>
            <Droppable droppableId={`${i}`}>
              {(providedDroppable, snapshot) => (
                <Box
                  {...providedDroppable.droppableProps}
                  ref={providedDroppable.innerRef}
                  padding="8px"
                  my="8px"
                  width="100%"
                  borderRadius={8}
                  border={snapshot.isDraggingOver ? '1px solid blue' : '1px solid gray'}
                >
                  {items.map(({ id }, i) => {
                    return (
                      <Draggable key={id} draggableId={id} index={i}>
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
                              border={snapshot.isDragging ? '1px solid green' : '1px solid gray'}
                              alignItems="center"
                              style={{ ...providedDraggable.draggableProps.style }}
                            >
                              <Box>
                                <Icon as={MdDragIndicator} mr={2} mt={2} w={6} h={6} />
                              </Box>
                              <Text isTruncated>{id}</Text>
                              <Box flexGrow={1}></Box>
                              <IconButton
                                aria-label="Remove Item"
                                tooltip="Remove Item"
                                Icon={MdRemove}
                                onClick={() => {}}
                                size="md"
                                variant="solid"
                                bg="gray.700"
                                iconColor="red.300"
                                ml={2}
                              />
                            </Flex>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                  {providedDroppable.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        );
      })}
    </Box>
  );
}

export default ProfileEditDrawer;
