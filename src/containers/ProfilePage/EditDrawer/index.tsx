import {
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Tooltip,
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import AccordionComponent from '../../../components/Accordion';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  closeEditBar,
  saveProfile,
  selectBadgeCount,
  selectSaving,
  selectShowEditBar,
  selectStoreAssets,
} from '../slice';
import EditInfoForm from './EditInfoForm';
import EditColorsForm from './EditColorsForm';
import EditBadgesForm from './EditBadgesForm';
import EditProfilePictureForm from './EditProfilePictureForm';
import EditAchievementForm from './EditAchievementForm';
import { useEthers } from '@usedapp/core';
import { REGULAR_TOTAL_BADGE_COUNT } from '../../../common/constants';

function ProfileEditDrawer() {
  const intl = useIntl();
  const showEditBar = useAppSelector(selectShowEditBar);
  const saving = useAppSelector(selectSaving);
  const dispatch = useAppDispatch();
  const { account, library } = useEthers();
  const closeEdit = () => dispatch(closeEditBar());
  const badgeCount = useAppSelector(selectBadgeCount);
  const { premium } = useAppSelector(selectStoreAssets);

  const maxBadgeCountReached = !premium && badgeCount > REGULAR_TOTAL_BADGE_COUNT; // this is possible if they have previously had premium and are now trying to save their profile without.
  const label = intl.formatMessage(
    {
      id: 'regular-max-badge-count',
      defaultMessage:
        'You have exceed the max number of badges for a premium account. You have ({current}) and the max is ({max})',
    },
    { current: badgeCount, max: REGULAR_TOTAL_BADGE_COUNT }
  );

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
          <Tooltip label={label} shouldWrapChildren isDisabled={!maxBadgeCountReached}>
            <Button
              colorScheme="brand"
              onClick={() => dispatch(saveProfile({ address: account!, library }))}
              isLoading={saving}
              disabled={maxBadgeCountReached}
            >
              {intl.formatMessage({ id: 'save-edits-button', defaultMessage: 'Save' })}
            </Button>
          </Tooltip>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ProfileEditDrawer;
