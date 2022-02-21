import { Box } from '@chakra-ui/layout';
import { ReactChild } from 'react';

function Paper({ children, ...props }: { children: ReactChild; [x: string]: any }) {
  return (
    <Box
      borderRadius="lg"
      background="profile.secondary"
      boxShadow="dark-lg"
      borderWidth="1px"
      borderColor="profile.secondary"
      {...props}
    >
      {children}
    </Box>
  );
}

export default Paper;
