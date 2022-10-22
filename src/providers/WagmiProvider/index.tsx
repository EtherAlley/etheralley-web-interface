import { WagmiConfig, createClient, configureChains, chain } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import Settings from '../../common/settings';

const { chains, provider } = configureChains(
  [Settings.IS_DEV ? chain.polygonMumbai : chain.polygon],
  [alchemyProvider({ apiKey: Settings.CHAIN_URL })]
);

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
});

export const metaMaskConnector = new MetaMaskConnector({
  chains,
});

export const coinbaseWalletConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'etheralley.io',
  },
});

const client = createClient({
  autoConnect: true,
  connectors: [walletConnectConnector, metaMaskConnector, coinbaseWalletConnector],
  provider,
});

function WagmiProvider({ children }: { children: JSX.Element }) {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
}

export default WagmiProvider;
