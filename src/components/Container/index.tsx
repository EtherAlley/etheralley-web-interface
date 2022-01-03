import { Box, Flex, Container } from '@chakra-ui/layout';
import { ReactChild } from 'react';

export default ({ children, ...props }: { children: ReactChild; [x: string]: any }) => {
  return (
    <Container>
      <Flex minHeight="93vh">
        <Box margin="auto" {...props}>
          {children}
        </Box>
      </Flex>
    </Container>
  );
};
