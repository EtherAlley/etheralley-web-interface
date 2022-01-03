import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import useEagerConnect from '../../hooks/useEagerConnect';
import useInjectedListener from '../../hooks/useInjectedListener';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { saveProfile, selectProfile } from '../ProfilePage/slice';
import { Routes, ProfileMode } from '../../constants';
import { setProfileMode } from '../ProfilePage/slice';
import { Link as ReachLink, useHistory, useLocation } from 'react-router-dom';
import { Box, Flex, Heading, Button, Badge, LinkOverlay, LinkBox } from '@chakra-ui/react';
import { injectedConnector } from '../../connectors';

function Navbar() {
  const dispatch = useAppDispatch();
  const { profileMode } = useAppSelector(selectProfile);
  const { activate, active, account, library } = useWeb3React();
  const { pathname } = useLocation();
  const { push } = useHistory();
  const [activating, setActivating] = useState(false);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInjectedListener(!triedEager || activating);

  const isUsersProfile = pathname.split('/').length >= 3 && pathname.split('/')[2] === account;

  const UserButton = () => {
    if (!active || !account) {
      return (
        <Button
          colorScheme="brand"
          variant="outline"
          onClick={() => {
            setActivating(true);
            activate(injectedConnector);
          }}
          disabled={!triedEager || activating}
        >
          Connect to a wallet...
        </Button>
      );
    }

    if (!isUsersProfile) {
      return (
        <Button
          colorScheme="brand"
          variant="outline"
          onClick={() => push(Routes.PROFILE.replace(':address', account!))}
        >
          My Profile
        </Button>
      );
    }

    if (profileMode === ProfileMode.View) {
      return (
        <Button colorScheme="brand" variant="outline" onClick={() => dispatch(setProfileMode(ProfileMode.Edit))}>
          Edit Profile
        </Button>
      );
    }

    return (
      <Button
        colorScheme="brand"
        variant="outline"
        onClick={() => {
          dispatch(saveProfile({ address: account!, library }));
        }}
      >
        Save profile
      </Button>
    );
  };

  return (
    <>
      <Box bg={'gray.900'} position="fixed" zIndex={2} width="100%">
        <Flex h="7vh" alignItems={'center'} justifyContent={'space-between'} mx={4}>
          <LinkBox>
            <Heading size="md" as="span">
              <LinkOverlay to="/" as={ReachLink}>
                Ether Alley
              </LinkOverlay>
            </Heading>
            <Badge colorScheme="brand" mb={1} ml={3}>
              Alpha
            </Badge>
          </LinkBox>
          <UserButton />
        </Flex>
      </Box>
      <Box h="7vh"></Box>
    </>
  );
}

export default Navbar;
