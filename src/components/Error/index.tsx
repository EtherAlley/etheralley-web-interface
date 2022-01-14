import { Box, Flex, Heading, Icon } from '@chakra-ui/react';
import { RiErrorWarningLine } from 'react-icons/ri';
import BugFixing from '../../svgs/BugFixing';

function Error({ message }: { message: string }) {
  return (
    <Box>
      <Flex justifyContent="center" ml={7}>
        <BugFixing width={250} height={250} />
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
