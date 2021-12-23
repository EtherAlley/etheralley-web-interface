import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadProfile, selectProfile } from './slice';
import Profile from './Profile';

function ProfilePage() {
  const { address } = useParams<{ address: string }>();

  const { library } = useWeb3React();

  const { loading, error, profileMode, profileConfig } = useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProfile({ library, address }));
  }, [dispatch, library, address]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (!profileConfig) {
    return <div>no profile found... default profile goes here</div>;
  }

  return (
    <div>
      <Profile profileMode={profileMode} elements={profileConfig.elements} />
    </div>
  );
}

export default ProfilePage;
