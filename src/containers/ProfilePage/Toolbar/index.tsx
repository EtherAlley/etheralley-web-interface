import { useIntl } from 'react-intl';
import { openEditBar, selectAddress, selectShowEditBar } from '../../ProfilePage/slice';
import { Routes } from '../../../common/constants';
import { useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import IconButton from '../../../components/IconButton';
import { MdKeyboardBackspace, MdModeEdit } from 'react-icons/md';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { useEthers } from '@usedapp/core';

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
    />
  );
}

function ProfileBar() {
  const navigate = useNavigate();
  const intl = useIntl();

  const buttonLabel = intl.formatMessage({ id: 'go-home-button', defaultMessage: 'Go Home' });

  return (
    <>
      <Box position="fixed" width="100%" mt={4}>
        <Flex alignItems={'center'} justifyContent={'space-between'} mx={4}>
          <IconButton
            aria-label={buttonLabel}
            tooltip={buttonLabel}
            Icon={MdKeyboardBackspace}
            onClick={() => navigate(Routes.HOME)}
          />
          <EditButton />
        </Flex>
      </Box>
    </>
  );
}

export default ProfileBar;
