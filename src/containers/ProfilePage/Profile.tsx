import ReactFlow from 'react-flow-renderer/nocss';

import 'react-flow-renderer/dist/style.css';
import { Elements } from 'react-flow-renderer';
import { ProfileMode } from '../../constants';

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

function Profile({ profileMode, elements }: { profileMode: ProfileMode; elements: Elements }) {
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
      <ReactFlow elements={elements} {...defaultSettings} {...profileSettings} />
    </div>
  );
}

export default Profile;
