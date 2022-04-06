import { Box, Flex, Heading } from '@chakra-ui/react';
import ErrorSvg from '../../icons/Error';

function Error({ message }: { message: string }) {
  return (
    <Box>
      <Flex justifyContent="center">
        <ErrorSvg width={70} height={70} />
      </Flex>
      <Heading as="h1" size="md" textAlign="center" mt={4}>
        {message}
      </Heading>
    </Box>
  );
}

export default Error;
