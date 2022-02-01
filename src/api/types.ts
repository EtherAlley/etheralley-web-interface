import { Blockchains, Interfaces, StatisticTypes } from '../common/constants';

export type Profile = {
  non_fungible_tokens: NonFungibleToken[];
  fungible_tokens: FungibleToken[];
  statistics: Statistic[];
};

export type Contract = {
  blockchain: Blockchains;
  address: string;
  interface: Interfaces;
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

export type Statistic = {
  type: StatisticTypes;
  contract: Contract;
  data: Swap[] | any;
};

export type SwapToken = {
  id: string;
  amount: string;
  symbol: string;
};

export type Swap = {
  id: string;
  timestamp: string;
  amountUSD: string;
  input: SwapToken;
  output: SwapToken;
};
