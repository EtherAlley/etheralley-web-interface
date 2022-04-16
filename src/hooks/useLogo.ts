import { useEffect, useState } from 'react';
import { Blockchains, Interfaces } from '../common/constants';
import Settings from '../common/settings';
import tokens from './tokens';

// resolve the logo url for the given inputs
export default function useLogo({
  contractAddress,
  blockchain,
  interfaceName,
}: {
  contractAddress?: string;
  blockchain?: Blockchains;
  interfaceName?: Interfaces;
}): string | undefined {
  const [key, setKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (contractAddress && blockchain) {
      setKey(buildUrl(getTokenKey(contractAddress, blockchain)));
    } else if (blockchain && !contractAddress) {
      setKey(buildUrl(getBlockchainKey(blockchain)));
    } else if (interfaceName) {
      setKey(buildUrl(getInterfaceKey(interfaceName)));
    }
  }, [contractAddress, blockchain, interfaceName]);

  return key;
}

function buildUrl(urlSuffix: string | undefined): string | undefined {
  if (!urlSuffix) {
    return undefined;
  }

  return `${Settings.PUBLIC_URL}/${urlSuffix}`;
}

// we do not want to show a token logo just because a contract has the same symbol. So we maintain a mapping of known contracts.
// unknown contracts will resolve to empty string.
function getTokenKey(contractAddress: string, blockchain: Blockchains): string | undefined {
  const tokenContracts = tokens[blockchain];

  if (!tokenContracts) {
    return undefined;
  }

  const token = tokenContracts.find((x) => x.address.toLowerCase() === contractAddress.toLowerCase());

  if (token) {
    return `tokens/${token.symbol.toLowerCase()}.png`;
  }

  return undefined;
}

function getInterfaceKey(interfaceName: Interfaces): string | undefined {
  switch (interfaceName) {
    case Interfaces.SUSHISWAP_EXCHANGE:
      return 'logos/sushiswap.svg';
    case Interfaces.UNISWAP_V2_EXCHANGE:
    case Interfaces.UNISWAP_V3_EXCHANGE:
      return 'logos/uniswap.svg';
    case Interfaces.ROCKET_POOL:
      return 'logos/rocketpool.png';
    default:
      return undefined;
  }
}

function getBlockchainKey(blockchain: Blockchains): string | undefined {
  switch (blockchain) {
    case Blockchains.ETHEREUM:
    case Blockchains.OPTIMISM:
    case Blockchains.ARBITRUM:
      return 'logos/ethereum.svg';
    case Blockchains.POLYGON:
      return 'logos/polygon.svg';
    default:
      return undefined;
  }
}
