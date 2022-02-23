import { Icon, Link } from '@chakra-ui/react';
import { RiExternalLinkLine } from 'react-icons/ri';

function LinkComponent({ url, text }: { url: string; text: string }) {
  return (
    <Link color="blue.500" href={url} isExternal>
      {text}
      <Icon as={RiExternalLinkLine} ml={2}></Icon>
    </Link>
  );
}

export default LinkComponent;
