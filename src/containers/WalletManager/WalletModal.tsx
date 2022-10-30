import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Image,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useIntl } from 'react-intl';
import { useConnect } from 'wagmi';
import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';
import { metaMaskConnector, coinbaseWalletConnector, walletConnectConnector } from '../../providers/WagmiProvider';
import { closeWalletModal, connectToWallet, selectWallet } from './slice';

export default function WalletModal() {
  const intl = useIntl();
  const { connectAsync } = useConnect();
  const { isWalletModalOpen } = useAppSelector(selectWallet);
  const dispatch = useAppDispatch();

  return (
    <>
      <Modal isOpen={isWalletModalOpen} onClose={() => dispatch(closeWalletModal())}>
        <ModalOverlay />
        <ModalContent backgroundColor="gray.900">
          <ModalHeader>
            <Text textAlign="center">
              {intl.formatMessage({ id: 'connect-a-wallet', defaultMessage: 'Connect a Wallet' })}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <Button
                onClick={() => dispatch(connectToWallet({ connectAsync, connector: metaMaskConnector }))}
                height={50}
                my={3}
              >
                <Image src={`/logos/metamask.svg`} width="30px" height="30px" borderRadius="8px" mr={3} />
                {intl.formatMessage({ id: 'metamask', defaultMessage: 'MetaMask' })}
              </Button>
              <Button
                onClick={() => dispatch(connectToWallet({ connectAsync, connector: coinbaseWalletConnector }))}
                height={50}
                my={3}
              >
                <Image src={`/logos/coinbasewallet.svg`} width="30px" height="30px" borderRadius="8px" mr={3} />
                {intl.formatMessage({ id: 'coinbase-wallet', defaultMessage: 'Coinbase Wallet' })}
              </Button>
              <Button
                onClick={() => dispatch(connectToWallet({ connectAsync, connector: walletConnectConnector }))}
                my={3}
                height={50}
              >
                <Image src={`/logos/walletconnect.svg`} width="30px" height="30px" borderRadius="8px" mr={3} />
                {intl.formatMessage({ id: 'wallet-connect', defaultMessage: 'WalletConnect' })}
              </Button>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" variant="solid" mr={3} onClick={() => dispatch(closeWalletModal())}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
