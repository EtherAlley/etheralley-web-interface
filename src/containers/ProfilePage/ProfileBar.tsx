import { useWeb3React } from '@web3-react/core';
import { selectAddress, selectProfileMode } from '../ProfilePage/slice';
import { Routes, ProfileMode } from '../../common/constants';
import { setProfileMode } from '../ProfilePage/slice';
import { useNavigate } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import IconButton from '../../components/IconButton';
import { MdKeyboardBackspace, MdModeEdit } from 'react-icons/md';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

function EditButton() {
  const dispatch = useAppDispatch();
  const profileMode = useAppSelector(selectProfileMode);
  const { account } = useWeb3React();
  const address = useAppSelector(selectAddress);

  if (profileMode === ProfileMode.Edit || !account || account.toLowerCase() !== address.toLowerCase()) {
    return <></>;
  }

  return (
    <IconButton
      aria-label="edit profile"
      tooltip="Edit profile"
      Icon={MdModeEdit}
      onClick={() => dispatch(setProfileMode(ProfileMode.Edit))}
    />
  );
}

function ProfileBar() {
  const navigate = useNavigate();

  return (
    <>
      <Box position="fixed" width="100%" mt={4}>
        <Flex alignItems={'center'} justifyContent={'space-between'} mx={4}>
          <IconButton
            aria-label="go home"
            tooltip="Go Home"
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
