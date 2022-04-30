import { Box, Center, Container } from '@chakra-ui/react';
import { ReactChild } from 'react';
import ErrorBoundary from '../ErrorBoundary';

function PageWrapper({ children }: { children: ReactChild }) {
  return (
    <Container maxW="container.lg">
      <Box mt="15vh" />
      <Center>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Center>
    </Container>
  );
}

export default PageWrapper;
