import { Grid, GridItem, Center } from '@chakra-ui/react';
import ErrorBoundary from '../../../components/ErrorBoundary';
import ProfilePicture from './ProfilePicture';
import ProfileText from './ProfileText';

function ProfileHeader() {
  return (
    <Grid templateColumns={[`repeat(1, 1fr)`, `repeat(6, 1fr)`]} gap={10}>
      <GridItem colSpan={[6, 1]}>
        <Center>
          <ErrorBoundary>
            <ProfilePicture />
          </ErrorBoundary>
        </Center>
      </GridItem>
      <GridItem colSpan={[6, 5]}>
        <ErrorBoundary>
          <ProfileText />
        </ErrorBoundary>
      </GridItem>
    </Grid>
  );
}

export default ProfileHeader;
