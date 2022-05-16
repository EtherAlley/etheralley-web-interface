import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Box, Container } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { loadProfile, selectError, selectProfileNotFound } from './slice';
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
import NotFound from '../../components/NotFound';
import DragDropProvider from '../../providers/DragDropProvider';

function PageWrapper() {
  return (
    <Box backgroundColor="profile.primary">
      <Toolbar />
      <Container maxW="container.lg">
        <Box height="15vh" />
        <ErrorBoundary>
          <ProfilePage />
        </ErrorBoundary>
        <Box height="15vh" />
      </Container>
    </Box>
  );
}

function ProfilePage() {
  const intl = useIntl();
  const { address } = useParams<{ address: string }>();
  const error = useAppSelector(selectError);
  const profileNotFound = useAppSelector(selectProfileNotFound);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (address) {
      dispatch(loadProfile({ address }));
    }
  }, [address, dispatch]);

  if (error && profileNotFound) {
    return (
      <NotFound
        title={intl.formatMessage({ id: 'profile-not-found', defaultMessage: 'Profile Not Found' })}
        subtitle={intl.formatMessage({
          id: 'non-existent-profile',
          defaultMessage: "The profile you're looking for does not seem to exist",
        })}
      />
    );
  }

  if (error) {
    return (
      <Error
        message={intl.formatMessage({ id: 'profiles-page-load-error', defaultMessage: 'Error Loading Profile' })}
        subtext={intl.formatMessage({
          id: 'profiles-page-load-error-subtext',
          defaultMessage: "We couldn't seem to load the profile at this time",
        })}
      />
    );
  }

  return (
    <>
      <Profile />
      <DragDropProvider>
        <EditDrawer />
      </DragDropProvider>
      <AddBadgeModal />
      <AddProfilePictureModal />
      <AddAchievementModal />
    </>
  );
}

export default PageWrapper;
