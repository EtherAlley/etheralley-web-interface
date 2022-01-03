// https://stackoverflow.com/questions/69769360/error-importing-framer-motion-v5-in-react-with-create-react-app
module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  });

  return webpackConfig;
};
