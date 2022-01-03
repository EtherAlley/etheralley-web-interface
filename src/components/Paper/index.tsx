import { Box } from '@chakra-ui/layout';
import { ReactChild } from 'react';

export default ({ children, ...props }: { children: ReactChild; [x: string]: any }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray.900"
      boxShadow="dark-lg"
      p={4}
      background="gray.900"
      {...props}
    >
      {children}
    </Box>
  );
};
