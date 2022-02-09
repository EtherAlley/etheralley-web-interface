import { useEffect, useState } from 'react';
import { Blockchains } from '../common/constants';
import Settings from '../common/settings';

export default function useEtherscanUrl(blockchain: Blockchains, resource: string, id: string): string {
  const [url, setUrl] = useState('');

  useEffect(() => {
    switch (blockchain) {
      case Blockchains.ETHEREUM:
      default:
        setUrl(`${Settings.ETHERSCAN_ETHEREUM_URL}/${resource}/${id}`);
        break;
      case Blockchains.ARBITRUM:
        setUrl(`${Settings.ETHERSCAN_ARBITRUM_URL}/${resource}/${id}`);
        break;
      case Blockchains.OPTIMISM:
        setUrl(`${Settings.ETHERSCAN_OPTIMISM_URL}/${resource}/${id}`);
        break;
      case Blockchains.POLYGON:
        setUrl(`${Settings.ETHERSCAN_POLYGON_URL}/${resource}/${id}`);
        break;
    }
  }, [blockchain, resource, id]);

  return url;
}
