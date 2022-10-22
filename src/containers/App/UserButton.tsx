import { Button } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Routes } from '../../common/constants';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { openWalletModal, selectIsConnectingToWallet, selectIsWalletModalOpen } from './slice';

function UserButton() {
  const { address, isConnected } = useAccount();
  const isConnectingToWallet = useAppSelector(selectIsConnectingToWallet);
  const isWalletModalOpen = useAppSelector(selectIsWalletModalOpen);
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const navigate = useNavigate();

  if (!isConnected || !address) {
    return (
      <Button
        isLoading={isConnectingToWallet}
        disabled={isWalletModalOpen}
        colorScheme="brand"
        variant="solid"
        onClick={() => dispatch(openWalletModal())}
      >
        {intl.formatMessage({ id: 'connect', defaultMessage: 'Connect' })}
      </Button>
    );
  }

  return (
    <>
      <Button colorScheme="brand" variant="solid" onClick={() => navigate(Routes.PROFILE.replace(':address', address))}>
        {intl.formatMessage({ id: 'my-profile', defaultMessage: 'My Profile' })}
      </Button>
    </>
  );
}

export default UserButton;
