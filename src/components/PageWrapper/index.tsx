import { Box, Center, Container } from '@chakra-ui/react';
import { ReactChild } from 'react';
import ErrorBoundary from '../ErrorBoundary';

function PageWrapper({ children }: { children: ReactChild }) {
  return (
    <Container>
      <Box mt="10vh" />
      <Center>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Center>
    </Container>
  );
}

export default PageWrapper;
