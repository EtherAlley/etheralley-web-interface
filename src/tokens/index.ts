import ethereumMainnet from './mainnet/ethereum.json';
import arbitrumMainnet from './mainnet/arbitrum.json';
import optimismMainnet from './mainnet/optimism.json';
import polygonMainnet from './mainnet/polygon.json';
import ethereumTestnet from './testnet/ethereum.json';
import arbitrumTestnet from './testnet/arbitrum.json';
import optimismTestnet from './testnet/optimism.json';
import polygonTestnet from './testnet/polygon.json';

type Token = { name: string; symbol: string; address: string };

type Tokens = {
  ethereum: Token[];
  arbitrum: Token[];
  optimism: Token[];
  polygon: Token[];
};

const MainnetTokens: Tokens = {
  ethereum: ethereumMainnet,
  arbitrum: arbitrumMainnet,
  optimism: optimismMainnet,
  polygon: polygonMainnet,
};

const TestnetTokens: Tokens = {
  ethereum: ethereumTestnet,
  arbitrum: arbitrumTestnet,
  optimism: optimismTestnet,
  polygon: polygonTestnet,
};

export default process.env.NODE_ENV === 'development' ? TestnetTokens : MainnetTokens;
