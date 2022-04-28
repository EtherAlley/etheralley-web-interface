import { Box } from '@chakra-ui/react';
import AchievementBar from './AchievementBar';
import Groups from './Groups';
import ProfileHeader from './ProfileHeader';

function Profile() {
  return (
    <Box>
      <ProfileHeader />
      <AchievementBar />
      <Groups />
    </Box>
  );
}

export default Profile;
