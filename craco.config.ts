import webpack from 'webpack';

// craco is used to hook into webpack and do any custom configurations without ejecting from CRA
// Currently used for:
// - add missing buffer pollyfills for CoinbaseWallet and WalletConnect connectors
//   - https://github.com/WalletConnect/walletconnect-monorepo/issues/748
module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          buffer: require.resolve('buffer'),
        },
      },
    },
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        }),
      ],
    },
  },
};
