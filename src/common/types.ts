import { Blockchains, InteractionTypes, Interfaces, StatisticTypes } from './constants';

export enum AchievementTypes {
  Interactions = 'interactions',
}

export enum BadgeTypes {
  NonFungibleToken = 'non_fungible_tokens',
  FungibleToken = 'fungible_tokens',
  Statistics = 'statistics',
}

export type Profile = {
  address: string;
  display_config: DisplayConfig;
  ens_name: string;
  interactions: Interaction[];
  [BadgeTypes.NonFungibleToken]: NonFungibleToken[];
  [BadgeTypes.FungibleToken]: FungibleToken[];
  [BadgeTypes.Statistics]: Statistic[];
};

export type DisplayConfig = {
  colors: {
    primary: string;
    secondary: string;
    primary_text: string;
    secondary_text: string;
  };
  text: {
    title: string;
    description: string;
  };
  picture: {
    item: DisplayItem | undefined;
  };
  achievements: {
    text: string;
    items: DisplayAchievement[];
  };
  groups: DisplayGroup[];
};

export type DisplayAchievement = {
  id: string;
  index: number;
  type: AchievementTypes;
};

export type DisplayGroup = {
  id: string;
  text: string;
  items: DisplayItem[];
};

export type DisplayItem = {
  id: string;
  index: number;
  type: BadgeTypes;
};

export type Contract = {
  blockchain: Blockchains;
  address: string;
  interface: Interfaces;
};

export type Transaction = {
  id: string;
  blockchain: Blockchains;
};

export type Interaction = {
  transaction: Transaction;
  type: InteractionTypes;
  timestamp: number;
};

export type NonFungibleToken = {
  contract: Contract;
  token_id: string;
  balance: string;
  metadata: NonFungibleMetadata | undefined;
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
