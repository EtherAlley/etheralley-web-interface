const Settings = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  IS_DEV: process.env.NODE_ENV === 'development',
  PUBLIC_URL: process.env.PUBLIC_URL ?? '',
  BASE_URL: process.env.REACT_APP_BASE_URL ?? '',
  PROFILES_API_URL: process.env.REACT_APP_PROFILES_API_URL ?? '',
  ALCHEMY_API_KEY: process.env.REACT_APP_ALCHEMY_API_KEY ?? '',
  CHAIN_KEY: process.env.REACT_APP_CHAIN_KEY ?? '',
  CHAIN_ID: Number.parseInt(process.env.REACT_APP_CHAIN_ID ?? '0'),
  STORE_ADDRESS: process.env.REACT_APP_STORE_ADDRESS ?? '',
  ETHERSCAN_ETHEREUM_URL: process.env.REACT_APP_ETHERSCAN_ETHEREUM_URL ?? '',
  ETHERSCAN_POLYGON_URL: process.env.REACT_APP_ETHERSCAN_POLYGON_URL ?? '',
  ETHERSCAN_OPTIMISM_URL: process.env.REACT_APP_ETHERSCAN_OPTIMISM_URL ?? '',
  ETHERSCAN_ARBITRUM_URL: process.env.REACT_APP_ETHERSCAN_ARBITRUM_URL ?? '',
  OPENSEA_URL: process.env.REACT_APP_OPENSEA_URL ?? '',
};

export default Settings;
