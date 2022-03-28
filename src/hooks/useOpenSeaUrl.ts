import { useEffect, useState } from 'react';
import { Blockchains } from '../common/constants';
import Settings from '../common/settings';

export default function useOpenSeaUrl(address: string, token_id: string, blockchain: Blockchains): string {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(`${Settings.OPENSEA_URL}/assets${infixFromBlockchain(blockchain)}/${address}/${token_id}`);
  }, [blockchain, address, token_id]);

  return url;
}

function infixFromBlockchain(blockchain: Blockchains): string {
  switch (blockchain) {
    case Blockchains.ETHEREUM:
      return Settings.IS_DEV ? '/goerli' : '';
    case Blockchains.POLYGON:
      return Settings.IS_DEV ? '/mumbai' : '/matic';
    default:
      return '';
  }
}
