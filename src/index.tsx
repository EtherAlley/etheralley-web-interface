import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './containers/App';
import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';

const getLibrary = (provider: any, _connector: any) => {
  return new Web3Provider(provider);
};

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={'dark'} />
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Router>
            <App />
          </Router>
        </Web3ReactProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
