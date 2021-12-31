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
  owned: boolean;
  contract_address: string;
  schema_name: string;
  name: string;
  description: string;
  image_url: string;
  attributes: { [x: string]: string }[];
};
