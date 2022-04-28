import { useEffect, useState } from 'react';
import { Blockchains } from '../common/constants';

function useBlockchainLabel(blockchain: Blockchains): string {
  const [label, setLabel] = useState('');

  useEffect(() => {
    switch (blockchain) {
      case Blockchains.POLYGON:
        setLabel('Polygon');
        break;
      case Blockchains.OPTIMISM:
        setLabel('Optimism');
        break;
      case Blockchains.ARBITRUM:
        setLabel('Arbitrum');
        break;
      case Blockchains.ETHEREUM:
      default:
        setLabel('Ethereum');
        break;
    }
  }, [blockchain]);

  return label;
}

export default useBlockchainLabel;
