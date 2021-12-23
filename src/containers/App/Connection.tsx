import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from '../../connectors';
import useEagerConnect from '../../hooks/useEagerConnect';
import useInjectedListener from '../../hooks/useInjectedListener';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { saveProfile, selectProfile } from '../ProfilePage/slice';
import { useHistory, useLocation } from 'react-router-dom';
import { Routes, ProfileMode } from '../../constants';
import { setProfileMode } from '../ProfilePage/slice';

function Connection() {
  const dispatch = useAppDispatch();
  const { profileMode } = useAppSelector(selectProfile);
  const { push } = useHistory();
  const { pathname } = useLocation();
  const { activate, active, library, account } = useWeb3React();

  const [activating, setActivating] = useState(false);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInjectedListener(!triedEager || activating);

  const isUsersProfile = pathname.split('/').length >= 3 && pathname.split('/')[2] === account;

  return active && account ? (
    <span>
      {isUsersProfile ? (
        profileMode === ProfileMode.View ? (
          <button onClick={() => dispatch(setProfileMode(ProfileMode.Edit))}>Edit Profile</button>
        ) : (
          <button
            onClick={() => {
              dispatch(saveProfile({ library, account }));
            }}
          >
            Save profile
          </button>
        )
      ) : (
        <>
          <button onClick={() => push(Routes.PROFILE.replace(':address', account))}>My Profile</button>
        </>
      )}
    </span>
  ) : (
    <button
      onClick={() => {
        setActivating(true);
        activate(injectedConnector);
      }}
      disabled={!triedEager || activating}
    >
      Connect to a wallet...
    </button>
  );
}

export default Connection;
