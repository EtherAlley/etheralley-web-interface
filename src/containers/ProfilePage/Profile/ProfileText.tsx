import { Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { BADGE_WIDTH } from '../../../common/constants';
import Paper from './Paper';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectLoading, selectInfo } from './../slice';

function ProfileText() {
  const { title, description, twitter_handle } = useAppSelector(selectInfo);
  const loading = useAppSelector(selectLoading);

  const height = BADGE_WIDTH + 24;

  if (loading) {
    return (
      <Paper p={4}>
        <Stack height={height}>
          <Skeleton width="30%" height={height / 6} />;
          <Skeleton width="100%" height={height / 6 - 2} mt={2} />
          <Skeleton width="100%" height={height / 6 - 2} mt={2} />
          <Skeleton width="100%" height={height / 6 - 2} mt={2} />
          <Skeleton width="100%" height={height / 6 - 2} mt={2} />
          <Skeleton width="100%" height={height / 6 - 2} mt={2} />
        </Stack>
      </Paper>
    );
  }

  return !!title || !!description ? (
    <Paper p={4}>
      <Stack height={height + (twitter_handle ? 32 : 0)}>
        <Heading size="lg" mb={5} noOfLines={1} textColor="profile.secondaryText">
          {title}
        </Heading>
        <Text size="md" fontWeight="semibold" noOfLines={6} textColor="profile.secondaryText">
          {description}
        </Text>
      </Stack>
    </Paper>
  ) : (
    <></>
  );
}

export default ProfileText;
