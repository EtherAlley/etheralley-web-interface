import ReactFlow, { useStoreState } from 'react-flow-renderer/nocss';
import { useWeb3React } from '@web3-react/core';

import { ProfileConfig, ProfileMode } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { saveProfile } from './slice';

import 'react-flow-renderer/dist/style.css';
import { fromRFStatetoProfileConfig } from './transformers';

const defaultSettings = {};

const viewSettings = {
  zoomOnScroll: false,
  zoomOnPinch: false,
  zoomOnDoubleClick: false,
  paneMoveable: false,
  nodesDraggable: false,
  nodesConnectable: false,
};

const editSettings = {
  nodesDraggable: true,
};

function Sidebar() {
  const nodes = useStoreState((store) => store.nodes);
  const transform = useStoreState((store) => store.transform);
  const state = useStoreState((store) => store);
  const dispatch = useAppDispatch();
  const { library, account } = useWeb3React();

  return (
    <div>
      <div className="title">Zoom & pan transform</div>
      <div className="transform">
        [{transform[0].toFixed(2)}, {transform[1].toFixed(2)}, {transform[2].toFixed(2)}]
      </div>
      <div className="title">Nodes</div>
      {nodes.map((node) => (
        <div key={node.id}>
          Node {node.id} - x: {node.__rf.position.x.toFixed(2)}, y: {node.__rf.position.y.toFixed(2)}
        </div>
      ))}
      <button
        onClick={() => {
          dispatch(saveProfile({ library, account: account!, profileConfig: fromRFStatetoProfileConfig(state) }));
        }}
      >
        Save profile
      </button>
    </div>
  );
}

function Profile({ profileMode, profileConfig }: { profileMode: ProfileMode; profileConfig: ProfileConfig }) {
  let profileSettings;
  switch (profileMode) {
    case ProfileMode.View:
      profileSettings = viewSettings;
      break;
    case ProfileMode.Edit:
    default:
      profileSettings = editSettings;
      break;
  }
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {profileMode === ProfileMode.Edit && <Sidebar />}
      <ReactFlow {...profileConfig} {...defaultSettings} {...profileSettings} />
    </div>
  );
}

export default Profile;
