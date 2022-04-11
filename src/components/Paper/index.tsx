import { Box } from '@chakra-ui/layout';
import { ReactChild } from 'react';

function Paper({ children, ...props }: { children: ReactChild; [x: string]: any }) {
  return (
    <Box
      borderRadius="lg"
      background="gray.800"
      boxShadow="dark-lg"
      borderWidth="1px"
      borderColor="gray.800"
      {...props}
    >
      {children}
    </Box>
  );
}

export default Paper;
