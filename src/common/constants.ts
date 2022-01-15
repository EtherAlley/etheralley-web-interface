export const Routes = {
  HOME: '/',
  PROFILE: '/profiles/:address',
};

export enum ProfileMode {
  View = 'VIEW',
  Edit = 'EDIT',
}

export enum ContractKeys {
  DAI = 'dai',
  ETH = 'eth',
  WETH = 'weth',
  MATIC = 'matic',
  WMATIC = 'wmatic',
  UNI = 'uni',
  LINK = 'link',
  UNKNOWN = 'unknown',
}

export enum Blockchains {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  ARBITRUM = 'arbitrum',
  OPTIMISM = 'optimism',
}

export enum Interfaces {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}
