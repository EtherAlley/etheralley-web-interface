import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadProfile, selectProfile } from './slice';
import Profile from './Profile';
import LoadingOverlay from '../../components/LoadingOverlay';
import ErrorOverlay from '../../components/ErrorOverlay';

function ProfilePage() {
  const { address } = useParams<{ address: string }>();

  const { library } = useWeb3React();

  const { loading, error, profileMode, profileConfig } = useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProfile({ library, address }));
  }, [dispatch, library, address]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay />;
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
