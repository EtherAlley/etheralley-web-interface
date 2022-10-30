import { Flex, Box, Image } from '@chakra-ui/react';
import { Profile } from '../../common/types';
import ProfileUser from '../../icons/ProfileUser';
import Verified from '../../icons/Verified';

function ProfilePicture({ profile, width, height }: { profile: Profile; width: number; height: number }) {
  const premium = profile.store_assets.premium;
  const profileImage = getProfileImage(profile);

  return (
    <Box position="relative">
      {profileImage ? (
        <Flex>
          <Image
            src={profileImage}
            fallback={<Anonymous width={width} height={height} />}
            width={width}
            height={height}
            borderRadius="50%"
            maxWidth="inherit"
            boxShadow="dark-lg"
          />
        </Flex>
      ) : (
        <Anonymous width={width} height={height} />
      )}
      <Box position="absolute" right="0%" bottom="0%">
        {premium && <Verified width={width * 0.4} height={height * 0.4} />}
      </Box>
    </Box>
  );
}

function Anonymous({ width, height }: { width: number; height: number }) {
  return (
    <Flex
      width={width}
      height={height}
      borderRadius="50%"
      backgroundColor="gray.700"
      alignItems="center"
      justifyContent="center"
      boxShadow="dark-lg"
    >
      <ProfileUser width="35px" height="35px" />
    </Flex>
  );
}

function getProfileImage(profile: Profile): string | undefined {
  if (!profile.profile_picture) {
    return undefined;
  }

  if (
    !profile.profile_picture.metadata ||
    !profile.profile_picture.balance ||
    profile.profile_picture.balance === '0'
  ) {
    return undefined;
  }

  return profile.profile_picture.metadata.image;
}

export default ProfilePicture;
