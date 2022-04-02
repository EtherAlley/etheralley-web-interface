import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './containers/App';
import { store } from './store';
import { Provider } from 'react-redux';
import ThemeProvider from './providers/ThemeProvider';
import DragDropProvider from './providers/DragDropProvider';
import IntlProvider from './providers/IntlProvider';
import { DAppProvider } from '@usedapp/core';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <IntlProvider>
          <DragDropProvider>
            <DAppProvider config={{}}>
              <Router>
                <App />
              </Router>
            </DAppProvider>
          </DragDropProvider>
        </IntlProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
