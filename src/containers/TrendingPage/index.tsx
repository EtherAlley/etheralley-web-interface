import { Text, Heading, useBreakpointValue, Flex, Box, Image, LinkOverlay, LinkBox, Skeleton } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Profile } from '../../common/types';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import ProfileUser from '../../icons/ProfileUser';
import Verified from '../../icons/Verified';
import {
  getProfiles,
  selectErrorLoadingTopProfiles,
  selectFulfilledTopProfiles,
  selectLoadingTopProfiles,
  selectSpotlightProfile,
  selectTrendingProfiles,
} from './slice';
import Error from '../../components/Error';
import useDisplayId from '../../hooks/useDisplayId';

function TrendingPage() {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const trendingProfiles = useAppSelector(selectTrendingProfiles);
  const spotlightProfile = useAppSelector(selectSpotlightProfile);
  const loading = useAppSelector(selectLoadingTopProfiles);
  const error = useAppSelector(selectErrorLoadingTopProfiles);
  const loaded = useAppSelector(selectFulfilledTopProfiles);
  const maxWidth = useBreakpointValue({ base: 280, sm: 500 });

  useEffect(() => {
    // We don't re-fetch top profiles if we already have. They don't change often.
    if (!loaded) {
      dispatch(getProfiles());
    }
  }, [dispatch, loaded]);

  if (error) {
    return (
      <Error
        message={intl.formatMessage({
          id: 'top-profiles-load-error',
          defaultMessage: 'Error Loading Trending Page',
        })}
        subtext={intl.formatMessage({
          id: 'top-profiles-load-error-subtext',
          defaultMessage: "We couldn't seem to load the page at this time",
        })}
      />
    );
  }

  return (
    <Box>
      <Heading as="h2" fontSize="2xl" textAlign="center" mb={5}>
        {intl.formatMessage({ id: 'spotlight-profile-caption', defaultMessage: 'Spotlight Profile' })}
      </Heading>
      {loading || !spotlightProfile ? (
        <Box mx="8px" my="18px">
          <Skeleton width={maxWidth} height="64px" borderRadius="8px" />
        </Box>
      ) : (
        <Row profile={spotlightProfile} />
      )}
      <Box my="150px" />
      <Heading as="h2" fontSize="2xl" textAlign="center" mb={5}>
        {intl.formatMessage({ id: 'trending-profiles-caption', defaultMessage: 'Trending Profiles' })}
      </Heading>
      <Box m={2}>
        {loading
          ? Array(10)
              .fill(0)
              .map((_, i) => (
                <Box mx="8px" my="18px" key={i}>
                  <Skeleton width={maxWidth} height="64px" borderRadius="8px" />
                </Box>
              ))
          : trendingProfiles.map((profile, i) => {
              return <Row key={profile.address} profile={profile} rank={i + 1} />;
            })}
      </Box>
    </Box>
  );
}

function Row({ profile, rank }: { profile: Profile; rank?: number }) {
  const maxWidth = useBreakpointValue({ base: 200, sm: 400 });
  const trimmedAddress = useDisplayId(profile.address);
  const premium = profile.store_assets.premium;
  const profileImage = getProfileImage(profile);

  return (
    <LinkBox as={RouterLink} to={`/profiles/${profile.ens_name || profile.address}`}>
      <Flex
        alignItems="center"
        _hover={{
          bg: 'gray.700',
        }}
        borderRadius="8px"
        py={3}
        justifyContent={rank ? undefined : 'center'}
      >
        {rank && (
          <Box minWidth="60px">
            <Text fontWeight="bold" fontSize="xl" textAlign="center">
              {medal(rank)}
            </Text>
          </Box>
        )}

        <Picture premium={premium} src={profileImage} />
        <Box ml={5} mr={2}>
          <LinkOverlay as="span">
            <Text color="blue.400" fontWeight="bold" noOfLines={1} maxWidth={maxWidth}>
              {profile.ens_name || trimmedAddress}
            </Text>
          </LinkOverlay>
        </Box>
      </Flex>
    </LinkBox>
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

function Anonymous() {
  return (
    <Flex
      width="50px"
      height="50px"
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

function Picture({ src, premium }: { src: string | undefined; premium: boolean }) {
  return (
    <Box position="relative">
      {src ? (
        <Flex>
          <Image
            src={src}
            fallback={<Anonymous />}
            width="50px"
            height="50px"
            borderRadius="50%"
            maxWidth="inherit"
            boxShadow="dark-lg"
          />
        </Flex>
      ) : (
        <Anonymous />
      )}
      <Box position="absolute" right="0%" bottom="0%">
        {premium && <Verified width="20px" height="20px" />}
      </Box>
    </Box>
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

export default TrendingPage;
