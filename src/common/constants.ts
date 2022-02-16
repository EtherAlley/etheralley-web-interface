export const BADGE_WIDTH = 185;
export const BADGE_HEIGHT = 220;

export const Routes = {
  HOME: '/',
  PROFILE: '/profiles/:address',
};

export enum ProfileMode {
  View = 'VIEW',
  Edit = 'EDIT',
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
  ENS_REGISTRAR = 'ENS_REGISTRAR',
  SUSHISWAP_EXCHANGE = 'SUSHISWAP_EXCHANGE',
  UNISWAP_V2_EXCHANGE = 'UNISWAP_V2_EXCHANGE',
  UNISWAP_V3_EXCHANGE = 'UNISWAP_V3_EXCHANGE',
}

export enum InteractionTypes {
  CONTRACT_CREATION = 'CONTRACT_CREATION',
  SEND_ETHER = 'SEND_ETHER',
}

export enum StatisticTypes {
  SWAP = 'SWAP',
}
