import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadProfile, selectProfile } from './slice';
import Profile from './Profile';
import LoadingOverlay from '../../components/LoadingOverlay';
import ErrorOverlay from '../../components/ErrorOverlay';

function ProfilePage() {
  const { address } = useParams<{ address: string }>();

  const { loading, error, profileMode, profileConfig } = useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProfile({ address }));
  }, []);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error || !profileConfig) {
    console.log(loading, error, profileConfig);
    return <ErrorOverlay />;
  }

  return (
    <div>
      <Profile profileMode={profileMode} profileConfig={profileConfig} />
    </div>
  );
}

export default ProfilePage;
