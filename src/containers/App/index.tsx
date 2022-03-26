import { Route, Routes } from 'react-router';
import HomePage from '../HomePage';
import ProfilePage from '../ProfilePage';
import TopProfilesPage from '../TopProfilesPage';
import ShopPage from '../ShopPage';
import { Routes as RouteStrings } from '../../common/constants';
import NavBar from './NavBar';
import useToasts from './useToasts';

function App() {
  useToasts();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path={RouteStrings.PROFILE} element={<ProfilePage />} />
        <Route path={RouteStrings.TOP_PROFILES} element={<TopProfilesPage />} />
        <Route path={RouteStrings.SHOP} element={<ShopPage />} />
        <Route path={RouteStrings.HOME} element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
