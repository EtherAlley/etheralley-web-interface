import { useHistory } from 'react-router';
import { Routes } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectHome, setAddress } from './slice';

function HomePage() {
  const { push } = useHistory();
  const dispatch = useAppDispatch();
  const { address } = useAppSelector(selectHome);
  return (
    <div>
      <form onSubmit={() => push(Routes.PROFILE.replace(':address', address))}>
        <input
          placeholder="Enter ENS name or Ethereum address..."
          onChange={(event) => dispatch(setAddress(event.target.value))}
          value={address}
          style={{ width: '15rem' }}
        />
        <button disabled={!address}>submit</button>
      </form>
    </div>
  );
}

export default HomePage;
