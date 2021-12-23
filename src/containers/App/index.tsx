import { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import Home from '../HomePage';
import Profile from '../ProfilePage';
import { Routes } from '../../constants';
import NavBar from './NavBar';
import { useWeb3React } from '@web3-react/core';
import { networkConnector } from '../../connectors';
import LoadingOverlay from '../../components/LoadingOverlay';

function App() {
  const { activate, active } = useWeb3React();

  useEffect(() => {
    activate(networkConnector);
  }, [activate]);

  return (
    <>
      <NavBar />
      {active ? (
        <Switch>
          <Route path={Routes.PROFILE}>
            <Profile />
          </Route>
          <Route path={Routes.HOME}>
            <Home />
          </Route>
        </Switch>
      ) : (
        <LoadingOverlay />
      )}
    </>
  );
}

export default App;
