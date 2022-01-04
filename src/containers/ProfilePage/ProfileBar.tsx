import { useWeb3React } from '@web3-react/core';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { saveProfile, selectProfile } from '../ProfilePage/slice';
import { Routes, ProfileMode } from '../../constants';
import { setProfileMode } from '../ProfilePage/slice';
import { useHistory, useParams } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import IconButton from '../../components/IconButton';
import { RiArrowGoBackLine, RiSaveLine, RiPencilLine, RiCloseLine } from 'react-icons/ri';

function ProfileBar() {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const { profileMode } = useAppSelector(selectProfile);
  const { account, library } = useWeb3React();
  const { address } = useParams<{ address: string }>();

  const UserButton = () => {
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
  };

  return (
    <>
      <Box position="fixed" width="100%" mt={4}>
        <Flex alignItems={'center'} justifyContent={'space-between'} mx={4}>
          <IconButton
            aria-label="go home"
            tooltip="Go Home"
            Icon={RiArrowGoBackLine}
            onClick={() => push(Routes.HOME)}
          />
          <UserButton />
        </Flex>
      </Box>
    </>
  );
}

export default ProfileBar;
