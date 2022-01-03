import { Spinner } from '@chakra-ui/spinner';
import Container from '../../components/Container';

function LoadingOverlay() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

export default LoadingOverlay;
