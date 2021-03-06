import { useIntl } from 'react-intl';
import { openEditBar, selectAddress } from '../../ProfilePage/slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import IconButton from '../../../components/IconButton';
import { MdModeEdit } from 'react-icons/md';
import { FaArrowLeft, FaTwitter } from 'react-icons/fa';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { useEthers } from '@usedapp/core';
import Settings from '../../../common/settings';
import useIsMobile from '../../../hooks/useIsMobile';
import { connectToWallet, selectIsConnecting } from '../../App/slice';
import { Routes } from '../../../common/constants';

function Toolbar() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileToolbar /> : <DesktopToolbar />;
}

function MobileToolbar() {
  return (
    <Box position="fixed" bottom={0} width="100%" bgColor="profile.secondary">
      <Flex alignItems="center" justifyContent="space-between" mx="3">
        <GoBackButton />
        <EditButton />
        <TweetButton />
      </Flex>
    </Box>
  );
}

function DesktopToolbar() {
  return (
    <Box position="fixed" width="100%" ml="10">
      <Flex flexDirection="column" width="50px">
        <Box height="15vh" />
        <GoBackButton />
        <EditButton />
        <TweetButton />
      </Flex>
    </Box>
  );
}

function GoBackButton() {
  const navigate = useNavigate();
  const intl = useIntl();

  const goBackLabel = intl.formatMessage({ id: 'go-back-button', defaultMessage: 'Go Back' });
  return (
    <IconButton
      aria-label={goBackLabel}
      tooltip={goBackLabel}
      Icon={FaArrowLeft}
      onClick={() => navigate(-1)}
      iconColor="profile.accent"
      bgColor="profile.secondary"
      borderRadius="8px 8px 0px 0px"
    />
  );
}

function TweetButton() {
  const intl = useIntl();
  const twitterLabel = intl.formatMessage({ id: 'twitter-button', defaultMessage: 'Share on Twitter' });
  const { pathname } = useLocation();

  return (
    <IconButton
      aria-label={twitterLabel}
      tooltip={twitterLabel}
      Icon={FaTwitter}
      onClick={() =>
        window.open(`https://twitter.com/intent/tweet?text=${getTweetContent()}&url=${getTweetUrl(pathname)}`, '_blank')
      }
      iconColor="profile.accent"
      bgColor="profile.secondary"
      borderRadius="0px 0px 8px 8px"
    />
  );
}

function getTweetContent(): string {
  return encodeURIComponent(`Check me out on etheralley.io\n\n`);
}

function getTweetUrl(pathname: string): string {
  return encodeURIComponent(`${Settings.BASE_URL}/#${pathname}`);
}

function EditButton() {
  const isMobile = useIsMobile();
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { account, activateBrowserWallet } = useEthers();
  const address = useAppSelector(selectAddress);
  const connecting = useAppSelector(selectIsConnecting);
  const navigate = useNavigate();

  // try to connect to wallet if no account
  // if account and not on the account profile, navigate to account profile
  // if connected and on the account profile, open the drawer
  const onClickEditButton = () => {
    if (!account) {
      dispatch(connectToWallet({ isMobile, activateBrowserWallet }));
    } else if (account && account.toLowerCase() !== address.toLowerCase()) {
      navigate(Routes.PROFILE.replace(':address', account));
    } else {
      dispatch(openEditBar());
    }
  };

  const buttonLabel = intl.formatMessage({ id: 'edit-profile-button', defaultMessage: 'Edit Profile' });

  return (
    <IconButton
      aria-label={buttonLabel}
      tooltip={buttonLabel}
      Icon={MdModeEdit}
      isLoading={connecting}
      onClick={onClickEditButton}
      iconColor="profile.accent"
      bgColor="profile.secondary"
      borderRadius="0px"
    />
  );
}

export default Toolbar;
