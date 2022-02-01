import { useEffect, useState } from 'react';
import { Interfaces } from '../common/constants';

// map interfaces to a logo key
export default function useInterfaceKey(contractInterface: Interfaces): string {
  const [key, setKey] = useState('');

  useEffect(() => {
    switch (contractInterface) {
      case Interfaces.SUSHISWAP_EXCHANGE:
        setKey('sushiswap');
        break;
      case Interfaces.UNISWAP_V2_EXCHANGE:
      case Interfaces.UNISWAP_V3_EXCHANGE:
        setKey('uniswap');
        break;
      default:
        break;
    }
  }, [contractInterface]);

  return key;
}
