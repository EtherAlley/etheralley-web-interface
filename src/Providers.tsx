import React, { ReactElement } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import ThemeProvider from './providers/ThemeProvider';
import DragDropProvider from './providers/DragDropProvider';
import IntlProvider from './providers/IntlProvider';
import { DAppProvider } from '@usedapp/core';

export const Providers = ({ children }: { children: ReactElement }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider>
          <IntlProvider>
            <DragDropProvider>
              <DAppProvider config={{}}>
                <Router>{children}</Router>
              </DAppProvider>
            </DragDropProvider>
          </IntlProvider>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
