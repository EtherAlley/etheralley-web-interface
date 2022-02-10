import { useEffect, useState } from 'react';
import { Blockchains } from '../common/constants';
import Settings from '../common/settings';

export default function useOpenSeaUrl(address: string, token_id: string, blockchain: Blockchains): string {
  const [url, setUrl] = useState('');

  useEffect(() => {
    switch (blockchain) {
      case Blockchains.ETHEREUM:
      case Blockchains.POLYGON:
        setUrl(`${Settings.OPENSEA_URL}/assets/${address}/${token_id}`);
        break;
      default:
        setUrl('');
        break;
    }
  }, [blockchain, address, token_id]);

  return url;
}
