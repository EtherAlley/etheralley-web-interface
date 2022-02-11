import { ReactNode, useEffect } from 'react';
import { useParams } from 'react-router';
import { Box, Center, Grid, GridItem } from '@chakra-ui/react';

import { loadProfile, selectProfilePage } from './slice';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ProfileBar from './ProfileBar';
import Container from '../../components/Container';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import Groups from './Groups';
import ProfileHeader from './ProfileHeader';
import ProfilePicture from './ProfilePicture';

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
      <Box>
        <Box height="100px" />
        <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem rowSpan={2} colSpan={1}>
            <ProfilePicture />
          </GridItem>
          <GridItem rowSpan={2} colSpan={4}>
            <ProfileHeader />
          </GridItem>
        </Grid>
        <Groups />
      </Box>
    </PageWrapper>
  );
}

export default ProfilePage;
