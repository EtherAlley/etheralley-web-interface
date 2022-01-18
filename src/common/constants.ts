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
}
