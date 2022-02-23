import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './containers/App';
import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import ThemeProvider from './containers/ThemeProvider';
import DragDropProvider from './containers/DragDropProvider';

const getLibrary = (provider: any, _connector: any) => {
  return new Web3Provider(provider);
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <DragDropProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <Router>
              <App />
            </Router>
          </Web3ReactProvider>
        </DragDropProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
