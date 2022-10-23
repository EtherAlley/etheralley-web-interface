import { Blockchains, InteractionTypes, Interfaces, StatisticTypes } from './constants';

export enum AchievementTypes {
  Interactions = 'interactions',
}

export enum BadgeTypes {
  NonFungibleToken = 'non_fungible_tokens',
  FungibleToken = 'fungible_tokens',
  Statistics = 'statistics',
  Currencies = 'currencies',
}

export type Listing = {
  contract: Contract;
  token_id: string;
  info: ListingInfo;
  metadata: NonFungibleMetadata;
};

export type ListingInfo = {
  purchasable: boolean;
  transferable: boolean;
  price: string;
  balanceLimit: string;
  supplyLimit: string;
  supply: string;
};

export type Profile = {
  address: string;
  display_config: DisplayConfig | undefined;
  store_assets: StoreAssets;
  ens_name: string;
  interactions: Interaction[];
  [BadgeTypes.NonFungibleToken]: NonFungibleToken[];
  [BadgeTypes.FungibleToken]: FungibleToken[];
  [BadgeTypes.Statistics]: Statistic[];
  [BadgeTypes.Currencies]: Currency[];
  last_modified: string | undefined;
};

export type StoreAssets = {
  premium: boolean;
  beta_tester: boolean;
};

export type DisplayConfig = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    shadow: string;
    primary_text: string;
    secondary_text: string;
  };
  info: {
    title: string;
    description: string;
    twitter_handle: string;
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
  balance: string | undefined;
  metadata: NonFungibleMetadata | undefined;
};

export type NonFungibleMetadata = {
  name: string;
  description: string;
  image: string;
  attributes?: { [x: string]: string | number | boolean | undefined }[];
};

export type FungibleToken = {
  contract: Contract;
  balance: string | undefined;
  metadata: FungibleMetadata;
};

export type FungibleMetadata = {
  name: string | undefined;
  symbol: string | undefined;
  decimals: number | undefined;
};

export type Currency = {
  blockchain: Blockchains;
  balance: string | undefined;
};

export type Statistic = {
  type: StatisticTypes;
  contract: Contract;
  data: Swap[] | Stake | undefined;
};

export type Stake = {
  total_rewards: string;
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
