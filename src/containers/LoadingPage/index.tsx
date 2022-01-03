import { Center } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import Container from '../../components/Container';

function LoadingOverlay() {
  return (
    <Container>
      <Center>
        <Spinner />
      </Center>
    </Container>
  );
}

export default LoadingOverlay;
