import { Blockchains, Interfaces, StatisticTypes } from '../common/constants';

export enum BadgeTypes {
  NonFungibleToken = 'non_fungible_tokens',
  FungibleToken = 'fungible_tokens',
  Statistics = 'statistics',
}

export type Profile = {
  display_config: DisplayConfig;
  ens_name: string;
  [BadgeTypes.NonFungibleToken]: NonFungibleToken[];
  [BadgeTypes.FungibleToken]: FungibleToken[];
  [BadgeTypes.Statistics]: Statistic[];
};

export type DisplayConfig = {
  header: { text: string };
  description: { text: string };
  picture: {
    item: DisplayItem | undefined;
  };
  groups: DisplayGroup[];
};

export type DisplayGroup = {
  text: string;
  items: DisplayItem[];
};

export type DisplayItem = {
  id: number;
  type: BadgeTypes;
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
