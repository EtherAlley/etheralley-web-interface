export const Routes = {
  HOME: '/',
  PROFILE: '/profiles/:address',
};

export enum ProfileMode {
  View = 'VIEW',
  Edit = 'EDIT',
}

export type Profile = {
  nft_elements: NFTElement[];
};

export type NFTElement = {
  order: number;
  address: string;
  schema_name: string;
  token_id: string;
  name: string;
  image_url: string;
  attributes: { [x: string]: string };
};
