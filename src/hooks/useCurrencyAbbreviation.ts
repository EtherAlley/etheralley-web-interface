import { useEffect, useState } from 'react';
import { Blockchains } from '../common/constants';

function useCurrencySymbol(blockchain: Blockchains): string {
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    switch (blockchain) {
      case Blockchains.POLYGON:
        setSymbol('MATIC');
        break;
      case Blockchains.OPTIMISM:
      case Blockchains.ARBITRUM:
      case Blockchains.ETHEREUM:
      default:
        setSymbol('ETH');
        break;
    }
  }, [blockchain]);

  return symbol;
}

export default useCurrencySymbol;
