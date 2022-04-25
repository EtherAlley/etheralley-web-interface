import { useEffect, useState } from 'react';
import { Blockchains } from '../common/constants';
import tokens from './tokens';

function useSearchTokens(keyword: string, blockchain: Blockchains | undefined) {
  const [results, setResults] = useState<
    {
      name: string;
      address: string;
    }[]
  >([]);

  useEffect(() => {
    if (!blockchain || !keyword) {
      setResults([]);
      return;
    }
    const tokenContracts = tokens[blockchain];
    if (!tokenContracts) {
      setResults([]);
      return;
    }
    const matches = tokenContracts
      .filter(
        (x) =>
          x.symbol.toLowerCase().includes(keyword.toLowerCase()) || x.name.toLowerCase().includes(keyword.toLowerCase())
      )
      .slice(0, 5);
    setResults(matches.map((match) => ({ address: match.id, name: match.name })));
  }, [keyword, blockchain]);

  return results;
}

export default useSearchTokens;
