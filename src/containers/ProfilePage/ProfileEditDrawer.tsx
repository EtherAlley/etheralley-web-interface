import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { ProfileMode } from '../../common/constants';
import AccordionComponent from '../../components/Accordion';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import useAppDispatch from '../../hooks/useAppDispatch';
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
} from './slice';

function ProfileEditDrawer() {
  const profileMode = useAppSelector(selectProfileMode);
  const dispatch = useAppDispatch();
  const { account, library } = useWeb3React();
  const cancelEditMode = () => dispatch(setProfileMode(ProfileMode.View));

  return (
    <Drawer isOpen={profileMode === ProfileMode.Edit} onClose={cancelEditMode} placement="right">
      <DrawerContent>
        <DrawerCloseButton onClick={cancelEditMode} />

        <DrawerHeader>Edit your profile</DrawerHeader>

        <DrawerBody>
          <AccordionComponent
            items={[
              { header: 'Info', body: <EditInfoForm /> },
              { header: 'Colors', body: <EditColorsForm /> },
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

export default ProfileEditDrawer;
