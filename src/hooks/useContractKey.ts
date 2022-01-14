import { useEffect, useState } from 'react';
import { Blockchains, ContractKeys } from '../constants';

export enum EthereumGoerliAddresses {
  DAI = '0x11fe4b6ae13d2a6055c8d9cf65c55bac32b5d844',
  WETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
  UNI = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
}

export enum PolygonMumbiAddresses {
  DAI = '0x001b3b4d0f3714ca98ba10f6042daebf0b1b7b6f',
  WMATIC = '0x9c3c9283d3e44854697cd22d3faa240cfb032889',
}

export enum ArbitrumRinkebyAddresses {
  WETH = '0xb47e6a5f8b33b3f17603c83a0535a9dcd7e32681',
}

export enum OptimismKovanAddresses {
  DAI = '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1',
  WETH = '0xbc6f6b680bc61e30db47721c6d1c5cde19c1300d',
  LINK = '0x4911b761993b9c8c0d14ba2d86902af6b0074f5b',
}

export const ContractToKeyMap: { [x: string]: { [y: string]: ContractKeys } } = {
  [Blockchains.ETHEREUM]: {
    [EthereumGoerliAddresses.DAI]: ContractKeys.DAI,
    [EthereumGoerliAddresses.WETH]: ContractKeys.WETH,
    [EthereumGoerliAddresses.UNI]: ContractKeys.UNI,
  },
  [Blockchains.POLYGON]: {
    [PolygonMumbiAddresses.DAI]: ContractKeys.DAI,
    [PolygonMumbiAddresses.WMATIC]: ContractKeys.WMATIC,
  },
  [Blockchains.ARBITRUM]: {
    [ArbitrumRinkebyAddresses.WETH]: ContractKeys.WETH,
  },
  [Blockchains.OPTIMISM]: {
    [OptimismKovanAddresses.DAI]: ContractKeys.DAI,
    [OptimismKovanAddresses.WETH]: ContractKeys.WETH,
    [OptimismKovanAddresses.LINK]: ContractKeys.LINK,
  },
};

export default function useContractKey(contractAddress: string, blockchain: Blockchains): ContractKeys {
  const [contractKey, setContractKey] = useState(ContractKeys.UNKNOWN);

  useEffect(() => {
    const key = ContractToKeyMap[blockchain][contractAddress];

    if (key) {
      setContractKey(key);
    }
  }, [contractAddress, blockchain]);

  return contractKey;
}
