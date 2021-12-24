import { ReactFlowState } from 'react-flow-renderer';
import { ProfileConfig } from '../../constants';

/**
 * transform to something simple we can store
 */
export function fromRFStatetoProfileConfig(reactFlowState: ReactFlowState): ProfileConfig {
  const profileConfig: ProfileConfig = {
    elements: [],
  };
  for (const node of reactFlowState.nodes) {
    profileConfig.elements.push({
      id: node.id,
      data: {
        label: node.data.label,
      },
      position: node.__rf.position,
    });
  }
  console.log(reactFlowState);
  console.log(profileConfig);
  return profileConfig;
}

/**
 * we cannot trust what we get back here. Must be strict and validate against bad actors
 * nfts they dont own?
 * randomg garbage config that is malicious?
 * etc
 */
export function fromIPFSToProfileConfig(data: string): ProfileConfig {
  return JSON.parse(data);
}

export function defaultConfig(): ProfileConfig {
  return {
    elements: [
      {
        id: '1',
        data: { label: 'This is a test node' },
        position: { x: 500, y: 25 },
      },
      {
        id: '2',
        data: { label: 'Some other node!!!' },
        position: { x: 100, y: 125 },
      },
      {
        id: '3',
        data: { label: 'the last node' },
        position: { x: 250, y: 250 },
      },
    ],
  };
}
