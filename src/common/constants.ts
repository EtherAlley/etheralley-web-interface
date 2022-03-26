export const BADGE_WIDTH = 185;
export const BADGE_HEIGHT = 220;

export const Routes = {
  HOME: '/',
  TOP_PROFILES: '/top-profiles',
  SHOP: '/shop',
  PROFILE: '/profiles/:address',
};

export const ZeroAddress = '0x0000000000000000000000000000000000000000';

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

export enum AsyncStates {
  READY = 'READY',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  FULFILLED = 'FULFILLED',
}

export enum Toasts {
  ADDING_BADGE = 'ADDING_BADGE',
  ADDING_PROFILE_PICTURE = 'ADDING_PROFILE_PICTURE',
  ADDING_ACHIEVEMENT = 'ADDING_ACHIEVEMENT',
}

export enum ToastStatuses {
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error',
}
