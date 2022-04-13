import { Box, Heading, Skeleton, Stack, Text } from '@chakra-ui/react';
import { BADGE_HEIGHT } from '../../../common/constants';
import Paper from '../../../components/Paper';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectLoading, selectInfo } from './../slice';

function ProfileText() {
  return (
    <Paper py={2} px={4}>
      <Box height={BADGE_HEIGHT + 50}>
        <TextArea />
      </Box>
    </Paper>
  );
}

function TextArea() {
  const { title, description } = useAppSelector(selectInfo);
  const loading = useAppSelector(selectLoading);

  if (loading) {
    return (
      <Stack>
        <Skeleton width="30%" height={8} />;
        <Skeleton width="100%" height={8} mt={2} />
        <Skeleton width="100%" height={8} mt={2} />
        <Skeleton width="100%" height={8} mt={2} />
        <Skeleton width="100%" height={8} mt={2} />
        <Skeleton width="100%" height={8} mt={2} />
      </Stack>
    );
  }

  return (
    <Stack>
      <Heading size="lg" mb={5} noOfLines={1}>
        {title}
      </Heading>
      <Text size="md" noOfLines={7}>
        {description}
      </Text>
    </Stack>
  );
}

export default ProfileText;
