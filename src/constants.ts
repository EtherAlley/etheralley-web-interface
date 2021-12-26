import { Node } from 'react-flow-renderer';

export const Routes = {
  HOME: '/',
  PROFILE: '/profiles/:address',
};

export const INJECTED_CONTEXT_NAME = 'INJECTED';

export enum ProfileMode {
  View = 'VIEW',
  Edit = 'EDIT',
}

export type ProfileConfig = {
  elements: Node[];
};
