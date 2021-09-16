import { Route, Switch } from 'react-router';
import Home from '../home';
import Profile from '../profile';
import { Routes } from '../../constants';
import NavBar from './NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path={Routes.PROFILE}>
          <Profile />
        </Route>
        <Route path={Routes.HOME}>
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
