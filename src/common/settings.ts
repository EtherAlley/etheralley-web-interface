const Settings = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PUBLIC_URL: process.env.PUBLIC_URL ?? '',
  CORE_API_URL: process.env.REACT_APP_CORE_API_URL ?? '',
  ETHERSCAN_ETHEREUM_URL: process.env.REACT_APP_ETHERSCAN_ETHEREUM_URL ?? '',
  ETHERSCAN_POLYGON_URL: process.env.REACT_APP_ETHERSCAN_POLYGON_URL ?? '',
  ETHERSCAN_OPTIMISM_URL: process.env.REACT_APP_ETHERSCAN_OPTIMISM_URL ?? '',
  ETHERSCAN_ARBITRUM_URL: process.env.REACT_APP_ETHERSCAN_ARBITRUM_URL ?? '',
  OPENSEA_URL: process.env.REACT_APP_OPENSEA_URL ?? '',
};

export default Settings;
