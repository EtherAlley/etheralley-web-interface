import { Box } from '@chakra-ui/layout';

function Paper({ children, ...props }: { children: React.ReactNode; [x: string]: string | number | React.ReactNode }) {
  return (
    <Box
      borderRadius="lg"
      background="gray.800"
      boxShadow={`dark-lg`}
      borderWidth="1px"
      borderColor="gray.800"
      {...props}
    >
      {children}
    </Box>
  );
}

export default Paper;
