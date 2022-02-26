import { Box } from '@chakra-ui/react';
import AchievementBar from './AchievementBar';
import Groups from './Groups';
import ProfileHeader from './ProfileHeader';

function Profile() {
  return (
    <>
      <Box height={100} />
      <ProfileHeader />
      <AchievementBar />
      <Groups />
    </>
  );
}

export default Profile;
