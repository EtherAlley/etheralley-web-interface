import { useHistory, useLocation } from 'react-router';
import { Routes } from '../../constants';
import Connection from './Connection';

function NavBar() {
  const { pathname } = useLocation();
  const { push } = useHistory();

  return (
    <header style={{ display: 'flex' }}>
      <span style={{ flexGrow: 1 }}>
        Ether Alley {pathname !== Routes.HOME && <button onClick={() => push(Routes.HOME)}>home</button>}
      </span>
      <span>
        <Connection />
      </span>
    </header>
  );
}

export default NavBar;
