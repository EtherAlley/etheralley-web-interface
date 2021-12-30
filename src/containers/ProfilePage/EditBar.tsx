import { useWeb3React } from '@web3-react/core';

import { useAppDispatch } from '../../hooks';
import { saveProfile } from './slice';

function EditBar() {
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
          dispatch(saveProfile({ address: account!, library }));
        }}
      >
        Save profile
      </button>
    </div>
  );
}

export default EditBar;
