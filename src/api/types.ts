import { Blockchains, Interfaces } from '../common/constants';

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
