import { ReactChild, useEffect } from 'react';
import { useParams } from 'react-router';
import { Box, Container } from '@chakra-ui/react';

import { loadProfile, selectError } from './slice';
import Error from '../../components/Error';
import ProfileBar from './ProfileBar';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import Groups from './Groups';
import ErrorBoundary from '../../components/ErrorBoundary';
import ProfileHeader from './ProfileHeader';
import AchievementBar from './AchievementBar';
import ProfileEditDrawer from './ProfileEditDrawer';

const PageWrapper = ({ children }: { children: ReactChild }) => {
  return (
    <Box backgroundColor="profile.primary">
      <ProfileBar />
      <Container maxW="container.lg">{children}</Container>
    </Box>
  );
};

function ProfilePage() {
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
      <PageWrapper>
        <Error message="Could not load profile" width={250} height={180} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ErrorBoundary message="Something went wrong" width={250} height={180}>
        <Box>
          <Box height={100} />
          <ProfileHeader />
          <AchievementBar />
          <Groups />
          <ProfileEditDrawer />
        </Box>
      </ErrorBoundary>
    </PageWrapper>
  );
}

export default ProfilePage;
