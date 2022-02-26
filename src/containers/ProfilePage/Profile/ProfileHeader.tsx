import { Grid, GridItem, Center } from '@chakra-ui/react';
import ProfilePicture from './ProfilePicture';
import ProfileText from './ProfileText';

function ProfileHeader() {
  return (
    <Grid templateColumns={[`repeat(1, 1fr)`, `repeat(6, 1fr)`]} gap={10}>
      <GridItem colSpan={[6, 1]}>
        <Center>
          <ProfilePicture />
        </Center>
      </GridItem>
      <GridItem colSpan={[6, 5]}>
        <ProfileText />
      </GridItem>
    </Grid>
  );
}

export default ProfileHeader;
