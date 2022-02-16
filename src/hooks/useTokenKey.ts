import { useEffect, useState } from 'react';
import { Blockchains } from '../common/constants';
import tokens from './tokens';

// we do not want to show a token logo just because a contract has the same symbol. So we maintain a mapping of known contracts.
// unknown contracts will resolve to empty string.
export default function useTokenKey(contractAddress: string, blockchain: Blockchains): string {
  const [key, setKey] = useState('');

  useEffect(() => {
    const tokenContracts = tokens[blockchain];

    if (!tokenContracts) {
      return;
    }

    const token = tokenContracts.find((x) => x.address.toLowerCase() === contractAddress.toLowerCase());

    if (token) {
      setKey(token.symbol.toLowerCase());
    }
  }, [contractAddress, blockchain]);

  return key;
}
