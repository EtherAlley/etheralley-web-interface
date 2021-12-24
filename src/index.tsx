import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './containers/App';
import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { INJECTED_CONTEXT_NAME } from './constants';
import { ReactFlowProvider } from 'react-flow-renderer/nocss';

const Web3ProviderInjected = createWeb3ReactRoot(INJECTED_CONTEXT_NAME);

const getLibrary = (provider: any, _connector: any) => {
  return new Web3Provider(provider);
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderInjected getLibrary={getLibrary}>
          <ReactFlowProvider>
            <Router>
              <App />
            </Router>
          </ReactFlowProvider>
        </Web3ProviderInjected>
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
