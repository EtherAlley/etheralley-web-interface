import React, { ReactElement } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import ThemeProvider from './providers/ThemeProvider';
import IntlProvider from './providers/IntlProvider';
import { DAppProvider } from '@usedapp/core';

export const Providers = ({ children }: { children: ReactElement }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <IntlProvider>
            <DAppProvider config={{}}>
              <Router>{children}</Router>
            </DAppProvider>
          </IntlProvider>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
