import { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import ThemeProvider from './providers/ThemeProvider';
import IntlProvider from './providers/IntlProvider';
import WagmiProvider from './providers/WagmiProvider';

export const Providers = ({ children }: { children: ReactElement }) => {
  return (
    <Provider store={store}>
      <WagmiProvider>
        <ThemeProvider>
          <IntlProvider>
            <Router>{children}</Router>
          </IntlProvider>
        </ThemeProvider>
      </WagmiProvider>
    </Provider>
  );
};
