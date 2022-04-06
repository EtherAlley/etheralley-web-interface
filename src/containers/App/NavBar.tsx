import { MouseEventHandler, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { Routes } from '../../common/constants';
import { useNavigate, useMatch, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Button,
  Badge,
  LinkOverlay,
  LinkBox,
  HStack,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import IconButtonComponent from '../../components/IconButton';
import { MdMenu, MdClose } from 'react-icons/md';
import { useEthers } from '@usedapp/core';
import Logo from '../../icons/Logo';

function Navbar() {
  const intl = useIntl();
  const isOnProfilePage = useMatch('/profiles/*');
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (isOnProfilePage) {
    return <></>;
  }

  const Links = [
    [intl.formatMessage({ id: 'top-profiles', defaultMessage: 'Top Profiles' }), Routes.TOP_PROFILES],
    [intl.formatMessage({ id: 'shop', defaultMessage: 'Shop' }), Routes.SHOP],
  ];

  return (
    <>
      <Box bg={'gray.800'} boxShadow="dark-lg" position="fixed" zIndex={2} width="100%">
        <Flex h="7vh" alignItems={'center'} justifyContent={'space-between'} mx={4}>
          <IconButtonComponent
            size={'md'}
            bg="inherit"
            Icon={isOpen ? MdClose : MdMenu}
            display={{ md: !isOpen ? 'none' : 'inherit' }}
            onClick={isOpen ? onClose : onOpen}
            tooltip={intl.formatMessage({ id: 'open-menu', defaultMessage: 'Open Menu' })}
            aria-label="open-menu"
          />
          <HStack alignItems={'center'}>
            <LinkBox mr={0}>
              <Flex alignItems="center">
                <Logo width={30} height={30} />
                <LinkOverlay to="/" as={RouterLink}>
                  <Heading size="md" as="span" ml={3}>
                    EtherAlley
                  </Heading>
                </LinkOverlay>
                <Badge colorScheme="brand" ml={3} display={['none', 'inherit']}>
                  {intl.formatMessage({ id: 'alpha', defaultMessage: 'Alpha' })}
                </Badge>
              </Flex>
            </LinkBox>
            <Box>
              <HStack as={'nav'} display={{ base: 'none', md: 'flex' }} ml={7}>
                {Links.map(([label, href]) => (
                  <NavLink key={href} href={href}>
                    {label}
                  </NavLink>
                ))}
              </HStack>
            </Box>
          </HStack>
          <UserButton />
        </Flex>
        {isOpen ? (
          <Box pb={4}>
            <Stack as={'nav'}>
              {Links.map(([label, href]) => (
                <NavLink key={href} href={href} onClick={onClose}>
                  {label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box h="7vh"></Box>
    </>
  );
}

function NavLink({
  children,
  href,
  onClick,
}: {
  children: ReactNode;
  href: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  const navigate = useNavigate();

  return (
    <Button
      colorScheme="brand"
      variant="ghost"
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }
        navigate(href);
      }}
    >
      {children}
    </Button>
  );
}

function UserButton() {
  const intl = useIntl();
  const navigate = useNavigate();
  const { activateBrowserWallet, account } = useEthers();

  if (!account) {
    return (
      <Button colorScheme="brand" variant="outline" onClick={activateBrowserWallet}>
        {intl.formatMessage({ id: 'connect-wallet', defaultMessage: 'Connect wallet' })}
      </Button>
    );
  }

  return (
    <Button colorScheme="brand" variant="outline" onClick={() => navigate(Routes.PROFILE.replace(':address', account))}>
      {intl.formatMessage({ id: 'my-profile', defaultMessage: 'My Profile' })}
    </Button>
  );
}

export default Navbar;
