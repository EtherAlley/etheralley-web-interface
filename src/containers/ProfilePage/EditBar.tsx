import { useStoreState } from 'react-flow-renderer/nocss';
import { useWeb3React } from '@web3-react/core';

import { useAppDispatch } from '../../hooks';
import { saveProfile } from './slice';
import { ReactFlowState } from 'react-flow-renderer';
import { ProfileConfig } from '../../constants';

export function toExternal(address: string, reactFlowState: ReactFlowState): ProfileConfig {
  const profileConfig: ProfileConfig = {
    address,
    elements: [],
  };
  for (const node of reactFlowState.nodes) {
    profileConfig.elements.push({
      id: node.id,
      type: node.type,
      data: node.data,
      position: node.__rf.position,
    });
  }
  return profileConfig;
}

function EditBar() {
  const state = useStoreState((store) => store);
  const dispatch = useAppDispatch();
  const { account, library } = useWeb3React();

  /**
   * add nft box button -> dispatch action to add new element to profile config
   * change selected box height -> dispatch action to modify existing element in profile config using currentSelectedNodeId
   * delete box -> dispatch action to delete current selected element from profile config
   */
  return (
    <div>
      <button>Add NFT Box</button>
      <label>Change selected box height</label>
      <input />
      <button>Delete box</button>
      <button
        onClick={() => {
          dispatch(saveProfile({ address: account!, library, profileConfig: toExternal(account!, state) }));
        }}
      >
        Save profile
      </button>
    </div>
  );
}

export default EditBar;
