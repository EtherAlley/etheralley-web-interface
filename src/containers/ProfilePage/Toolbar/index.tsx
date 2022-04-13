import { useIntl } from 'react-intl';
import { openEditBar, selectAddress, selectShowEditBar } from '../../ProfilePage/slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import IconButton from '../../../components/IconButton';
import { MdKeyboardBackspace, MdModeEdit } from 'react-icons/md';
import { FaTwitter } from 'react-icons/fa';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { useEthers } from '@usedapp/core';
import Settings from '../../../common/settings';

function ProfileBar() {
  return (
    <>
      <Box position="fixed" width="100%" mt={4}>
        <Flex alignItems={'center'} mx={4}>
          <HomeButton />
          <Box flexGrow={1} />
          <EditButton />
          <TweetButton />
        </Flex>
      </Box>
    </>
  );
}

function HomeButton() {
  const navigate = useNavigate();
  const intl = useIntl();

  const goHomeLabel = intl.formatMessage({ id: 'go-home-button', defaultMessage: 'Go Home' });
  return (
    <IconButton
      aria-label={goHomeLabel}
      tooltip={goHomeLabel}
      Icon={MdKeyboardBackspace}
      onClick={() => navigate(-1)}
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
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const showEditBar = useAppSelector(selectShowEditBar);
  const { account } = useEthers();
  const address = useAppSelector(selectAddress);

  if (showEditBar || !account || account.toLowerCase() !== address.toLowerCase()) {
    return <></>;
  }

  const buttonLabel = intl.formatMessage({ id: 'edit-profile-button', defaultMessage: 'Edit Profile' });

  return (
    <IconButton
      aria-label={buttonLabel}
      tooltip={buttonLabel}
      Icon={MdModeEdit}
      onClick={() => dispatch(openEditBar())}
      mr={2}
    />
  );
}

export default ProfileBar;
