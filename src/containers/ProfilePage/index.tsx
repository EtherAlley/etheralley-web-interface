import { useEffect } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadProfile, selectProfile } from './slice';
import Profile from './Profile';
import LoadingOverlay from '../LoadingPage';
import ErrorOverlay from '../ErrorPage';

function ProfilePage() {
  const { address } = useParams<{ address: string }>();

  const { loading, error, profile } = useAppSelector(selectProfile);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadProfile({ address }));
  }, [address, dispatch]);

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error || !profile) {
    return <ErrorOverlay />;
  }

  return <Profile profile={profile} />;
}

export default ProfilePage;
