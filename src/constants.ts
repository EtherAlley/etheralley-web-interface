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
  location: NFTLocation;
  owned: boolean;
  metadata: NFTMetadata;
};

export type NFTMetadata = {
  name: string;
  description: string;
  image: string;
  attributes: { [x: string]: string }[];
  properties: { [x: string]: any };
};

export type NFTLocation = {
  token_id: string;
  blockchain: string;
  contract_address: string;
  schema_name: string;
};
