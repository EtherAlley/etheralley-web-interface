import { RiErrorWarningLine } from 'react-icons/ri';
import { Box, Icon } from '@chakra-ui/react';
import Container from '../../components/Container';
import Paper from '../../components/Paper';

function ErrorOverlay() {
  return (
    <Container>
      <Paper>
        <>
          <Icon as={RiErrorWarningLine} w={4} h={4} color="red.500" />
          <Box ml={2} as="span">
            Failed to load...
          </Box>
        </>
      </Paper>
    </Container>
  );
}

export default ErrorOverlay;
