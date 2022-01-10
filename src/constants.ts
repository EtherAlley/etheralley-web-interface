export const Routes = {
  HOME: '/',
  PROFILE: '/profiles/:address',
};

export enum ProfileMode {
  View = 'VIEW',
  Edit = 'EDIT',
}

export type Profile = {
  non_fungible_tokens: NonFungibleToken[];
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
  attributes: { [x: string]: string }[];
  properties: { [x: string]: any };
};

export type Contract = {
  blockchain: string;
  address: string;
  interface: string;
};
