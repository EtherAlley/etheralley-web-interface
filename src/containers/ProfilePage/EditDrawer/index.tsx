import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import AccordionComponent from '../../../components/Accordion';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { closeEditBar, saveProfile, selectSaving, selectShowEditBar } from '../slice';
import EditInfoForm from './EditInfoForm';
import EditColorsForm from './EditColorsForm';
import EditBadgesForm from './EditBadgesForm';
import EditProfilePictureForm from './EditProfilePictureForm';
import EditAchievementForm from './EditAchievementForm';

function ProfileEditDrawer() {
  const intl = useIntl();
  const showEditBar = useAppSelector(selectShowEditBar);
  const saving = useAppSelector(selectSaving);
  const dispatch = useAppDispatch();
  const { account, library } = useWeb3React();
  const closeEdit = () => dispatch(closeEditBar());

  return (
    <Drawer size="md" isOpen={showEditBar} onClose={closeEdit} placement="right">
      <DrawerContent>
        <DrawerCloseButton onClick={closeEdit} />

        <DrawerHeader>
          {intl.formatMessage({ id: 'edit-profile-header', defaultMessage: 'Edit your profile' })}
        </DrawerHeader>

        <DrawerBody>
          <AccordionComponent
            items={[
              {
                header: intl.formatMessage({ id: 'profile-picture-form', defaultMessage: 'Profile Picture' }),
                body: <EditProfilePictureForm />,
              },
              { header: intl.formatMessage({ id: 'info-form', defaultMessage: 'Info' }), body: <EditInfoForm /> },
              { header: intl.formatMessage({ id: 'colors-form', defaultMessage: 'Colors' }), body: <EditColorsForm /> },
              { header: intl.formatMessage({ id: 'badges-form', defaultMessage: 'Badges' }), body: <EditBadgesForm /> },
              {
                header: intl.formatMessage({ id: 'achievement-form', defaultMessage: 'Achievements' }),
                body: <EditAchievementForm />,
              },
            ]}
          />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" colorScheme="red" mr={3} onClick={closeEdit}>
            {intl.formatMessage({ id: 'close-edit-button', defaultMessage: 'Close' })}
          </Button>
          <Button
            colorScheme="brand"
            onClick={() => dispatch(saveProfile({ address: account!, library }))}
            isLoading={saving}
          >
            {intl.formatMessage({ id: 'save-edits-button', defaultMessage: 'Save' })}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ProfileEditDrawer;
