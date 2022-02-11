import { Box, Heading } from '@chakra-ui/react';
import Paper from '../../components/Paper';
import useAppSelector from '../../hooks/useAppSelector';
import { selectDisplayConfig } from './slice';

function ProfileHeader() {
  const { header, description } = useAppSelector(selectDisplayConfig);

  return (
    <Paper py={2} px={4}>
      <Box>
        <Heading size="lg" mb={5}>
          {header.text}
        </Heading>
        <Heading size="md" mb={5}>
          {description.text}
        </Heading>
      </Box>
    </Paper>
  );
}

export default ProfileHeader;
