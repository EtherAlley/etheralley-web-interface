import ethereumMainnet from './ethereum.json';
import arbitrumMainnet from './arbitrum.json';
import optimismMainnet from './optimism.json';
import polygonMainnet from './polygon.json';

type Token = { name: string; symbol: string; id: string };

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

export default MainnetTokens;
