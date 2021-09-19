import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { injectedConnector } from '../../connectors';
import useEagerConnect from '../../hooks/useEagerConnect';
import useInjectedListener from '../../hooks/useInjectedListener';

function Connection() {
  const { activate, active } = useWeb3React();

  const [activating, setActivating] = useState(false);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInjectedListener(!triedEager || activating);

  return active ? (
    <span>connected!</span>
  ) : (
    <button
      onClick={() => {
        setActivating(true);
        activate(injectedConnector);
      }}
      disabled={!triedEager || activating}
    >
      connect to a wallet...
    </button>
  );
}

export default Connection;
