import { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router';
import { Center } from '@chakra-ui/react';

import { loadProfile, selectProfilePage } from './slice';
import Profile from './Profile';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ProfileBar from './ProfileBar';
import Container from '../../components/Container';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <ProfileBar />
      <Container maxW="container.lg">
        <Center>{children}</Center>
      </Container>
    </>
  );
};

function ProfilePage() {
  const { address } = useParams<{ address: string }>();
  const { loading, error } = useAppSelector(selectProfilePage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProfile({ address }));
  }, [address, dispatch]);

  if (loading) {
    return (
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <Error message="Could not load this profile" />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Profile />
    </PageWrapper>
  );
}

export default ProfilePage;
