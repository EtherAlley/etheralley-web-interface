import { useIntl } from 'react-intl';
import { Routes } from '../../common/constants';
import { useMatch, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Badge,
  Link,
  LinkOverlay,
  LinkBox,
  HStack,
  useDisclosure,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Spinner,
} from '@chakra-ui/react';
import IconButtonComponent from '../../components/IconButton';
import { MdMenu, MdClose, MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';
import EtherAlley from '../../icons/EtherAlley';
import { lazy, Suspense } from 'react';

const UserButton = lazy(() => import('../WalletManager/UserButton')); // wallet connection is expensive so we should load it asyn

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href: string;
  isExternal?: boolean;
}

function Navbar() {
  const intl = useIntl();
  const isOnProfilePage = useMatch('/profiles/*');
  const { isOpen, onToggle } = useDisclosure();

  if (isOnProfilePage) {
    return <></>;
  }

  const NAV_ITEMS: Array<NavItem> = [
    {
      label: intl.formatMessage({ id: 'trending', defaultMessage: 'Trending' }),
      href: Routes.TRENDING,
    },
    {
      label: intl.formatMessage({ id: 'shop', defaultMessage: 'Shop' }),
      href: Routes.SHOP,
    },
    {
      label: intl.formatMessage({ id: 'more', defaultMessage: 'More' }),
      href: '#',
      children: [
        {
          label: intl.formatMessage({ id: 'about', defaultMessage: 'About' }),
          subLabel: intl.formatMessage(
            { id: 'learn-more', defaultMessage: 'Learn more about {name}' },
            { name: 'EtherAlley' }
          ),
          href: Routes.ABOUT,
        },
        {
          label: intl.formatMessage({ id: 'github', defaultMessage: 'GitHub' }),
          subLabel: intl.formatMessage(
            { id: 'view-sourcecode', defaultMessage: 'View the source code on {name}' },
            { name: 'GitHub' }
          ),
          href: 'https://github.com/EtherAlley',
          isExternal: true,
        },
      ],
    },
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
            onClick={onToggle}
            tooltip={intl.formatMessage({ id: 'open-menu', defaultMessage: 'Open Menu' })}
            aria-label="open-menu"
          />
          <HStack alignItems={'center'}>
            <LinkBox>
              <Flex alignItems="center">
                <Box display={{ base: 'none', md: 'inherit' }}>
                  <EtherAlley width={30} height={30} />
                </Box>
                <LinkOverlay to="/" as={RouterLink}>
                  <Heading size="md" as="span" ml={3}>
                    EtherAlley
                  </Heading>
                </LinkOverlay>
                <Badge colorScheme="brand" ml={3} display={{ base: 'none', md: 'inherit' }}>
                  {intl.formatMessage({ id: 'alpha', defaultMessage: 'Alpha' })}
                </Badge>
                {/* Adding box with same width as logo on left to center the words EtherAlley better */}
                <Box width={30} />
              </Flex>
            </LinkBox>
            <Flex display={{ base: 'none', md: 'flex' }}>
              <DesktopNav navItems={NAV_ITEMS} />
            </Flex>
          </HStack>
          <Suspense fallback={<Spinner />}>
            <UserButton />
          </Suspense>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <MobileNav navItems={NAV_ITEMS} onToggleMenu={onToggle} />
        </Collapse>
      </Box>
      <Box h="7vh"></Box>
    </>
  );
}

const DesktopNav = ({ navItems }: { navItems: NavItem[] }) => {
  return (
    <Stack direction={'row'} spacing={4} ml={10}>
      {navItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                as={RouterLink}
                p={2}
                to={navItem.href}
                fontSize={'md'}
                fontWeight={500}
                color={'gray.200'}
                _hover={{
                  textDecoration: 'none',
                  color: 'brand.400',
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent border={0} boxShadow={'xl'} bg={'gray.800'} p={4} rounded={'xl'} minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, isExternal }: NavItem) => {
  const linkProps = isExternal ? { href, to: '' } : { as: RouterLink, to: href };
  return (
    <Link
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: 'gray.900' }}
      isExternal={isExternal}
      {...linkProps}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} _groupHover={{ color: 'brand.400' }} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'brand.400'} w={5} h={5} as={MdKeyboardArrowRight} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ navItems, onToggleMenu }: { navItems: NavItem[]; onToggleMenu: () => void }) => {
  return (
    <Stack bg={'gray.800'} p={4} display={{ md: 'none' }}>
      {navItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} onToggleMenu={onToggleMenu} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, onToggleMenu }: NavItem & { onToggleMenu: () => void }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack
      spacing={4}
      onClick={() => {
        if (children) {
          onToggle();
        } else {
          onToggleMenu();
        }
      }}
    >
      <Flex
        py={2}
        as={RouterLink}
        to={href}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
          color: 'brand.400',
        }}
      >
        <Text fontWeight={600}>{label}</Text>
        {children && (
          <Icon
            as={MdKeyboardArrowDown}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack mt={2} pl={4} borderLeft={1} borderStyle={'solid'} borderColor={'gray.700'} align={'start'}>
          {children &&
            children.map((child) => {
              const linkProps = child.isExternal ? { href: child.href, to: '' } : { as: RouterLink, to: child.href };
              return (
                <Link
                  key={child.label}
                  py={2}
                  onClick={onToggleMenu}
                  _hover={{
                    textDecoration: 'none',
                    color: 'brand.400',
                  }}
                  isExternal={child.isExternal}
                  {...linkProps}
                >
                  {child.label}
                </Link>
              );
            })}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default Navbar;
