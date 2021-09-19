import { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import Home from '../home';
import Profile from '../profile';
import { Routes } from '../../constants';
import NavBar from './NavBar';
import { useWeb3React } from '@web3-react/core';
import { networkConnector } from '../../connectors';

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
        <span>loading...</span>
      )}
    </>
  );
}

export default App;
