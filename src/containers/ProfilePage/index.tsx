import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Box, Container } from '@chakra-ui/react';

import { loadProfile, selectError } from './slice';
import Toolbar from './Toolbar';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import ErrorBoundary from '../../components/ErrorBoundary';
import EditDrawer from './EditDrawer';
import Profile from './Profile';
import AddBadgeModal from './ModalForms/AddBadgeModal';
import AddProfilePictureModal from './ModalForms/AddProfilePictureModal';
import AddAchievementModal from './ModalForms/AddAchievementModal';
import Error from '../../components/Error';
import { useIntl } from 'react-intl';

function PageWrapper() {
  return (
    <Box backgroundColor="profile.primary">
      <Toolbar />
      <Container maxW="container.lg">
        <Box height="10vh" />
        <ErrorBoundary>
          <ProfilePage />
        </ErrorBoundary>
      </Container>
    </Box>
  );
}

function ProfilePage() {
  const intl = useIntl();
  const { address } = useParams<{ address: string }>();
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (address) {
      dispatch(loadProfile({ address }));
    }
  }, [address, dispatch]);

  if (error) {
    return (
      <Error
        message={intl.formatMessage({ id: 'profiles-page-load-error', defaultMessage: 'Error Loading Profile' })}
      />
    );
  }

  return (
    <>
      <Profile />
      <EditDrawer />
      <AddBadgeModal />
      <AddProfilePictureModal />
      <AddAchievementModal />
    </>
  );
}

export default PageWrapper;
