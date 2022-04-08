import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import ErrorSvg from '../../icons/Error';

function Error({ message, subtext }: { message: string; subtext?: string }) {
  return (
    <Box>
      <Flex justifyContent="center">
        <ErrorSvg width={50} height={50} />
      </Flex>
      <Heading as="h1" size="md" textAlign="center" mt={4} mb={2}>
        {message}
      </Heading>
      {subtext && (
        <Text color={'gray.500'} textAlign="center">
          {subtext}
        </Text>
      )}
    </Box>
  );
}

export default Error;
