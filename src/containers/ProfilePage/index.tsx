import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadProfile, selectProfile } from './slice';
import Profile from './Profile';
import LoadingOverlay from '../LoadingPage';
import ErrorOverlay from '../ErrorPage';
import ProfileBar from './ProfileBar';
import Container from '../../components/Container';
import { Center } from '@chakra-ui/react';

function ProfilePage() {
  const { address } = useParams<{ address: string }>();

  const { loading, error, profile } = useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProfile({ address }));
  }, [address, dispatch]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error || !profile) {
    return <ErrorOverlay />;
  }

  return (
    <>
      <ProfileBar />
      <Container maxW="container.lg">
        <Center>
          <Profile profile={profile} />
        </Center>
      </Container>
    </>
  );
}

export default ProfilePage;
