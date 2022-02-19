import { useWeb3React } from '@web3-react/core';
import { saveProfile, selectProfileMode } from '../ProfilePage/slice';
import { Routes, ProfileMode } from '../../common/constants';
import { setProfileMode } from '../ProfilePage/slice';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import IconButton from '../../components/IconButton';
import { RiArrowGoBackLine, RiSaveLine, RiPencilLine, RiCloseLine } from 'react-icons/ri';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

function UserButton() {
  const dispatch = useAppDispatch();
  const profileMode = useAppSelector(selectProfileMode);
  const { account, library } = useWeb3React();
  const { address } = useParams<{ address: string }>();

  if (!account || account !== address) {
    return <></>;
  }

  if (profileMode === ProfileMode.View) {
    return (
      <IconButton
        aria-label="edit profile"
        tooltip="Edit profile"
        Icon={RiPencilLine}
        onClick={() => dispatch(setProfileMode(ProfileMode.Edit))}
      />
    );
  }

  return (
    <span>
      <IconButton
        aria-label="save profile"
        tooltip="Save Profile"
        Icon={RiSaveLine}
        onClick={() => dispatch(saveProfile({ address: account, library }))}
      />
      <IconButton
        aria-label="cancel edit profile"
        tooltip="Cancel edit"
        Icon={RiCloseLine}
        onClick={() => dispatch(setProfileMode(ProfileMode.View))}
      />
    </span>
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
            Icon={RiArrowGoBackLine}
            onClick={() => navigate(Routes.HOME)}
          />
          <UserButton />
        </Flex>
      </Box>
    </>
  );
}

export default ProfileBar;
