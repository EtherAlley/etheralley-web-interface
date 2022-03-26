import { Text, Heading, useBreakpointValue, Flex, Box, Divider, Center, Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Profile } from '../../common/types';
import Link from '../../components/Link';
import Loading from '../../components/Loading';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { getTopProfiles, selectLoadingTopProfiles, selectProfiles } from './slice';

function TopProfilesPageWrapper() {
  return (
    <Container>
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
        {intl.formatMessage({ id: 'top-profiles-caption', defaultMessage: 'Top Profiles Today' })}
      </Heading>
      <Center>
        <Divider w={250} />
      </Center>
      <Box>
        <Box m={2}>
          {profiles.map((profile, i) => {
            return <Row key={profile.address} profile={profile} rank={i + 1} />;
          })}
        </Box>
      </Box>
    </Box>
  );
}

function Row({ profile, rank }: { profile: Profile; rank: number }) {
  const maxWidth = useBreakpointValue({ base: 200, sm: 400 });
  const profileId = profile.ens_name || profile.address;
  return (
    <Flex my={1} alignItems="center">
      <Box width="40px" mx={3}>
        <Text fontWeight="bold" mr={2} fontSize="xl" textAlign="center">
          {medal(rank)}
        </Text>
      </Box>
      <Link href={`/profiles/${profileId}`}>
        <Text fontWeight="bold" isTruncated maxWidth={maxWidth}>
          {profileId}
        </Text>
      </Link>
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

export default TopProfilesPageWrapper;
