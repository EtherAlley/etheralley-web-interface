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
import AccordionComponent from '../../../components/Accordion';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { closeEditBar, saveProfile, selectShowEditBar } from '../slice';
import EditInfoForm from './EditInfoForm';
import EditColorsForm from './EditColorsForm';
import EditGroupsForm from './EditGroupsForm';

function ProfileEditDrawer() {
  const showEditBar = useAppSelector(selectShowEditBar);
  const dispatch = useAppDispatch();
  const { account, library } = useWeb3React();
  const closeEdit = () => dispatch(closeEditBar());

  return (
    <Drawer size="md" isOpen={showEditBar} onClose={closeEdit} placement="right">
      <DrawerContent>
        <DrawerCloseButton onClick={closeEdit} />

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
          <Button variant="outline" colorScheme="red" mr={3} onClick={closeEdit}>
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

export default ProfileEditDrawer;
