export const Routes = {
  HOME: '/',
  PROFILE: '/profiles/:address',
};

export enum ProfileMode {
  View = 'VIEW',
  Edit = 'EDIT',
}

export type Profile = {
  nfts: NFT[];
};

export type NFT = {
  token_id: string;
  blockchain: string;
  owned: boolean;
  contract_address: string;
  schema_name: string;
  metadata: NFTMetadata;
};

export type NFTMetadata = {
  name: string;
  description: string;
  image: string;
  attributes: { [x: string]: string }[];
  properties: { [x: string]: any };
};
