import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadProfile, selectProfile } from './slice';

function Profile() {
  const { address } = useParams<{ address: string }>();

  const { library } = useWeb3React();

  const { loading, error, balance } = useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProfile({ library, address }));
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  return (
    <div>
      <p>
        Showing profile [{address}] with balance [{balance}]
      </p>
    </div>
  );
}

export default Profile;
