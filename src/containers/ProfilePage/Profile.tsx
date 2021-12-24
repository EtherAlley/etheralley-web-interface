import ReactFlow from 'react-flow-renderer/nocss';

import { ProfileConfig, ProfileMode } from '../../constants';
import NFTNode from './NFTNode';
import EditBar from './EditBar';

import 'react-flow-renderer/dist/style.css';
import { useAppDispatch } from '../../hooks';
import { setCurrentSelectedNode } from './slice';

const defaultSettings: any = {
  snapToGrid: true,
  snapGrid: [20, 20],
  nodeTypes: {
    NFTNode,
  },
};

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

function buildSettings(profileMode: ProfileMode) {
  switch (profileMode) {
    case ProfileMode.View:
      return {
        ...defaultSettings,
        ...viewSettings,
      };
    case ProfileMode.Edit:
    default:
      return {
        ...defaultSettings,
        ...editSettings,
      };
  }
}

function Profile({ profileMode, profileConfig }: { profileMode: ProfileMode; profileConfig: ProfileConfig }) {
  const settings = buildSettings(profileMode);
  const dispatch = useAppDispatch();
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {profileMode === ProfileMode.Edit && <EditBar />}
      <ReactFlow
        onSelectionChange={(elements) => {
          const elementId = elements && elements.length > 0 ? elements[0].id : undefined;
          dispatch(setCurrentSelectedNode(elementId));
        }}
        {...profileConfig}
        {...settings}
      />
    </div>
  );
}

export default Profile;
