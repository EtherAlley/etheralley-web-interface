import { useHistory, useLocation } from 'react-router';
import { Routes } from '../../constants';

function NavBar() {
  const { pathname } = useLocation();
  const { push } = useHistory();
  return (
    <header>Ether Alley {pathname !== Routes.HOME && <button onClick={() => push(Routes.HOME)}>home</button>}</header>
  );
}

export default NavBar;
