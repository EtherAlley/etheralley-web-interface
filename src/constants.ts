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

export type Profile = {
  non_fungible_tokens: NonFungibleToken[];
  fungible_tokens: FungibleToken[];
};

export type NonFungibleToken = {
  contract: Contract;
  token_id: string;
  balance: string;
  metadata: NonFungibleMetadata;
};

export type NonFungibleMetadata = {
  name: string;
  description: string;
  image: string;
  attributes?: { [x: string]: string }[];
};

export type FungibleToken = {
  contract: Contract;
  balance: string;
  metadata: FungibleMetadata;
};

export type FungibleMetadata = {
  name: string;
  symbol: string;
  decimals: number;
};

export type Contract = {
  blockchain: Blockchains;
  address: string;
  interface: Interfaces;
};
