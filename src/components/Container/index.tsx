import { Box, Flex, Container } from '@chakra-ui/layout';
import { ReactChild } from 'react';

function ContainerComponent({ children, ...props }: { children: ReactChild; [x: string]: any }) {
  return (
    <Container>
      <Flex minHeight="93vh">
        <Box marginY="auto" width="100%" {...props}>
          {children}
        </Box>
      </Flex>
    </Container>
  );
}

export default ContainerComponent;
