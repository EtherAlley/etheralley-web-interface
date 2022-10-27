const Settings = {
  IS_DEV: import.meta.env.DEV,
  BASE_URL: import.meta.env.VITE_BASE_URL ?? '',
  PROFILES_API_URL: import.meta.env.VITE_PROFILES_API_URL ?? '',
  ALCHEMY_API_KEY: import.meta.env.VITE_ALCHEMY_API_KEY ?? '',
  CHAIN_KEY: import.meta.env.VITE_CHAIN_KEY ?? '',
  CHAIN_ID: Number.parseInt(import.meta.env.VITE_CHAIN_ID ?? '0'),
  STORE_ADDRESS: import.meta.env.VITE_STORE_ADDRESS ?? '',
  ETHERSCAN_ETHEREUM_URL: import.meta.env.VITE_ETHERSCAN_ETHEREUM_URL ?? '',
  ETHERSCAN_POLYGON_URL: import.meta.env.VITE_ETHERSCAN_POLYGON_URL ?? '',
  ETHERSCAN_OPTIMISM_URL: import.meta.env.VITE_ETHERSCAN_OPTIMISM_URL ?? '',
  ETHERSCAN_ARBITRUM_URL: import.meta.env.VITE_ETHERSCAN_ARBITRUM_URL ?? '',
  OPENSEA_URL: import.meta.env.VITE_OPENSEA_URL ?? '',
};

export default Settings;
