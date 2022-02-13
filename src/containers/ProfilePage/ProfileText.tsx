import { Box, Heading, Skeleton, Stack } from '@chakra-ui/react';
import { BADGE_HEIGHT } from '../../common/constants';
import Paper from '../../components/Paper';
import useAppSelector from '../../hooks/useAppSelector';
import { selectDisplayConfig, selectLoading } from './slice';

function ProfileText() {
  return (
    <Paper py={2} px={4}>
      <Box height={BADGE_HEIGHT + 10}>
        <Header />
        <Description />
      </Box>
    </Paper>
  );
}

function Header() {
  const { header } = useAppSelector(selectDisplayConfig);
  const loading = useAppSelector(selectLoading);

  if (loading) {
    return <Skeleton width="30%" height={8} />;
  }

  return (
    <Heading size="lg" mb={5} noOfLines={1}>
      {header.text}
    </Heading>
  );
}

function Description() {
  const { description } = useAppSelector(selectDisplayConfig);
  const loading = useAppSelector(selectLoading);

  if (loading) {
    return (
      <Stack>
        <Skeleton width="100%" height={8} mt={2} />
        <Skeleton width="100%" height={8} mt={2} />
        <Skeleton width="100%" height={8} mt={2} />
        <Skeleton width="100%" height={8} mt={2} />
        <Skeleton width="100%" height={8} mt={2} />
      </Stack>
    );
  }

  return (
    <Heading size="md" noOfLines={7}>
      {description.text}
    </Heading>
  );
}

export default ProfileText;
