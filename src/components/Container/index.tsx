import { Box, Flex, Container } from '@chakra-ui/layout';
import { ReactChild } from 'react';

function ContainerComponent({ children, maxW, ...props }: { children: ReactChild; maxW?: string; [x: string]: any }) {
  return (
    <Container maxW={maxW}>
      <Flex minHeight="93vh">
        <Box marginY="auto" width="100%" {...props}>
          {children}
        </Box>
      </Flex>
    </Container>
  );
}

export default ContainerComponent;
