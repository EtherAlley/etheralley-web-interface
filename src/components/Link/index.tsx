import { Icon, Link as LinkComponent } from '@chakra-ui/react';
import { ReactChild } from 'react';
import { RiExternalLinkLine } from 'react-icons/ri';
import { Link as RouterLink } from 'react-router-dom';

function Link({
  href,
  isExternal,
  children,
  color = 'blue.500',
}: {
  href: string;
  isExternal?: boolean;
  children: ReactChild;
  color?: string;
}) {
  const externalProps = {
    isExternal,
    href: href,
    to: '',
  };
  const props = {
    as: RouterLink,
    to: href,
  };
  return (
    <LinkComponent color={color} {...(isExternal ? externalProps : props)}>
      {children}
      {isExternal && <Icon as={RiExternalLinkLine} ml={2}></Icon>}
    </LinkComponent>
  );
}

export default Link;
