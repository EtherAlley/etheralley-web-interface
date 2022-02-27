import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useIntl } from 'react-intl';
import useEagerConnect from '../../hooks/useEagerConnect';
import useInjectedListener from '../../hooks/useInjectedListener';
import { Routes } from '../../common/constants';
import { Link as ReachLink, useNavigate, useMatch } from 'react-router-dom';
import { Box, Flex, Heading, Button, Badge, LinkOverlay, LinkBox } from '@chakra-ui/react';
import { injectedConnector } from '../../common/connectors';

function Navbar() {
  const { activate, active, account } = useWeb3React();
  const intl = useIntl();
  const navigate = useNavigate();
  const [activating, setActivating] = useState(false);
  const isOnProfilePage = useMatch('/profiles/*');
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInjectedListener(!triedEager || activating);

  if (isOnProfilePage) {
    return <></>;
  }

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
          {intl.formatMessage({ id: 'connect-to-a-wallet', defaultMessage: 'Connect to a wallet' })}
        </Button>
      );
    }

    return (
      <Button
        colorScheme="brand"
        variant="outline"
        onClick={() => navigate(Routes.PROFILE.replace(':address', account))}
      >
        {intl.formatMessage({ id: 'my-profile', defaultMessage: 'My Profile' })}
      </Button>
    );
  };

  return (
    <>
      <Box bg={'gray.800'} boxShadow="dark-lg" position="fixed" zIndex={2} width="100%">
        <Flex h="7vh" alignItems={'center'} justifyContent={'space-between'} mx={4}>
          <LinkBox>
            <Heading size="md" as="span">
              <LinkOverlay to="/" as={ReachLink}>
                Ether Alley
              </LinkOverlay>
            </Heading>
            <Badge colorScheme="brand" mb={1} ml={3}>
              {intl.formatMessage({ id: 'alpha', defaultMessage: 'Alpha' })}
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
