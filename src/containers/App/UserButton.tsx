import { Button, Divider, Flex, Icon, Popover, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSwitchNetwork, useDisconnect, useNetwork } from 'wagmi';
import { MdAccountCircle, MdLanguage, MdOutlineCancel } from 'react-icons/md';
import { Routes } from '../../common/constants';
import Settings from '../../common/settings';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import useDisplayId from '../../hooks/useDisplayId';
import {
  disconnectFromWallet,
  openWalletModal,
  selectIsConnectingToWallet,
  selectIsDisconnectingFromWallet,
  selectIsSwitchingNetwork,
  selectIsWalletModalOpen,
  switchNetwork,
} from './slice';

function UserButton() {
  const isConnectingToWallet = useAppSelector(selectIsConnectingToWallet);
  const isWalletModalOpen = useAppSelector(selectIsWalletModalOpen);
  const isSwitchingNetwork = useAppSelector(selectIsSwitchingNetwork);
  const isDisconnectingFromWallet = useAppSelector(selectIsDisconnectingFromWallet);
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { disconnectAsync } = useDisconnect();
  const navigate = useNavigate();
  const shortAddress = useDisplayId(address);

  if (!isConnected || !address || !switchNetworkAsync || !disconnectAsync) {
    return (
      <Button
        onClick={() => dispatch(openWalletModal())}
        isLoading={isConnectingToWallet}
        disabled={isWalletModalOpen}
        colorScheme="brand"
        variant="solid"
      >
        {intl.formatMessage({ id: 'connect', defaultMessage: 'Connect' })}
      </Button>
    );
  }

  return (
    <>
      <Popover trigger={'hover'} placement={'bottom-start'}>
        <PopoverTrigger>
          <Button
            _hover={{
              textDecoration: 'none',
              color: 'brand.400',
            }}
            variant="ghost"
          >
            <Text>{shortAddress}</Text>
          </Button>
        </PopoverTrigger>
        <PopoverContent maxWidth={250} border={0} boxShadow={'xl'} bg={'gray.800'} rounded={'xl'}>
          <Button
            _hover={{ bg: 'gray.900', color: 'brand.400' }}
            variant="ghost"
            justifyContent="flext-start"
            leftIcon={
              <Flex alignItems="center">
                <Icon as={MdAccountCircle} w={5} h={5} />
              </Flex>
            }
            onClick={() => navigate(Routes.PROFILE.replace(':address', address))}
          >
            <Text ml={3} fontWeight="semibold">
              {intl.formatMessage({ id: 'my-profile', defaultMessage: 'My Profile' })}
            </Text>
          </Button>
          {chain?.id !== Settings.CHAIN_ID && (
            <Button
              isLoading={isSwitchingNetwork}
              onClick={() => dispatch(switchNetwork({ switchNetworkAsync, chainId: Settings.CHAIN_ID }))}
              _hover={{ bg: 'gray.900', color: 'brand.400' }}
              variant="ghost"
              justifyContent="flext-start"
              leftIcon={
                <Flex alignItems="center">
                  <Icon as={MdLanguage} w={5} h={5} />
                </Flex>
              }
            >
              <Text ml={3} fontWeight="semibold">
                {intl.formatMessage(
                  { id: 'switch-network', defaultMessage: 'Switch to {chain}' },
                  { chain: 'Polygon (Matic)' }
                )}
              </Text>
            </Button>
          )}
          <Divider my={2} />
          <Button
            isLoading={isDisconnectingFromWallet}
            onClick={() => dispatch(disconnectFromWallet({ disconnectAsync }))}
            _hover={{ bg: 'gray.900' }}
            variant="ghost"
            justifyContent="flext-start"
            leftIcon={
              <Flex alignItems="center">
                <Icon color="red.500" as={MdOutlineCancel} w={5} h={5} />
              </Flex>
            }
          >
            <Text color="red.500" ml={3} fontWeight="semibold">
              {intl.formatMessage({ id: 'disconnect-wallet', defaultMessage: 'Disconnect Wallet' })}
            </Text>
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default UserButton;
