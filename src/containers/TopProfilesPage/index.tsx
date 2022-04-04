import { Text, Heading, useBreakpointValue, Flex, Box, Divider, Center, Container, Image } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { BadgeTypes, NonFungibleToken, Profile } from '../../common/types';
import Link from '../../components/Link';
import Loading from '../../components/Loading';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import ProfileUser from '../../icons/ProfileUser';
import Verified from '../../icons/Verified';
import { getTopProfiles, selectLoadingTopProfiles, selectProfiles } from './slice';

function TopProfilesPageWrapper() {
  return (
    <Container maxW="xl">
      <Box mt="10vh">
        <TopProfilesPage />
      </Box>
    </Container>
  );
}

function TopProfilesPage() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingTopProfiles);
  const profiles = useAppSelector(selectProfiles);

  useEffect(() => {
    dispatch(getTopProfiles());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <Heading fontSize="xl" textAlign="center" mb={5}>
        {intl.formatMessage({ id: 'top-ten-profiles-caption', defaultMessage: 'Top 10 Profiles Today' })}
      </Heading>
      <Center>
        <Divider w={250} />
      </Center>
      <Box m={2}>
        {profiles.map((profile, i) => {
          return <Row key={profile.address} profile={profile} rank={i + 1} />;
        })}
      </Box>
    </Box>
  );
}

function Row({ profile, rank }: { profile: Profile; rank: number }) {
  const maxWidth = useBreakpointValue({ base: 200, sm: 400 });
  const profileId = profile.ens_name || profile.address;
  const premium = profile.store_assets.premium;
  const profileImage = getProfileImage(profile);

  return (
    <Flex my={3} alignItems="center">
      <Box minWidth="60px">
        <Text fontWeight="bold" fontSize="xl" textAlign="center">
          {medal(rank)}
        </Text>
      </Box>
      <Picture premium={premium} src={profileImage} />
      <Box ml={5}>
        <Link href={`/profiles/${profileId}`}>
          <Text fontWeight="bold" isTruncated maxWidth={maxWidth}>
            {profileId}
          </Text>
        </Link>
      </Box>
    </Flex>
  );
}

function medal(rank: number): string {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return `${rank}`;
  }
}

function Picture({ src, premium }: { src: string | undefined; premium: boolean }) {
  return (
    <Box position="relative">
      <Flex>
        {src ? (
          <Image src={src} width="50px" height="50px" borderRadius="50%" maxWidth="inherit" />
        ) : (
          <Flex
            width="50px"
            height="50px"
            borderRadius="50%"
            backgroundColor="gray.700"
            alignItems="center"
            justifyContent="center"
          >
            <ProfileUser width="35px" height="35px" />
          </Flex>
        )}
      </Flex>
      <Box position="absolute" right="0%" bottom="0%">
        {premium && <Verified width="20px" height="20px" />}
      </Box>
    </Box>
  );
}

function getProfileImage(profile: Profile): string | undefined {
  // take the first item in the nft array if there is no configured profile picture
  if (
    !profile.display_config ||
    !profile.display_config.picture.item ||
    profile.display_config.picture.item.type !== BadgeTypes.NonFungibleToken
  ) {
    if (profile.non_fungible_tokens.length > 0 && !!profile.non_fungible_tokens[0].metadata) {
      return profile.non_fungible_tokens[0].metadata.image;
    }

    return undefined;
  }

  const item = profile.display_config.picture.item;
  const nfts = profile[item.type] as NonFungibleToken[];

  if (item.index >= nfts.length || item.index < 0) {
    return undefined;
  }

  const nft = nfts[item.index];

  if (!nft.metadata) {
    return undefined;
  }

  return nft.metadata.image;
}

export default TopProfilesPageWrapper;
