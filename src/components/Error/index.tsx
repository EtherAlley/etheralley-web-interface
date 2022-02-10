import { Box, Flex, Heading, Icon } from '@chakra-ui/react';
import { RiErrorWarningLine } from 'react-icons/ri';
import ErrorSvg from '../../svgs/Error';

function Error({ message }: { message: string }) {
  return (
    <Box>
      <Flex justifyContent="center" ml={7}>
        <ErrorSvg width={250} height={250} />
      </Flex>
      <Flex>
        <Icon as={RiErrorWarningLine} w={7} h={7} color="red.500" mr={4} />
        <Heading as="h3" size="md" textAlign="center">
          {message}
        </Heading>
      </Flex>
    </Box>
  );
}

export default Error;
