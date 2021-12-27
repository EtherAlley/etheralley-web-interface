import { Node } from 'react-flow-renderer';

export const Routes = {
  HOME: '/',
  PROFILE: '/profiles/:address',
};

export enum ProfileMode {
  View = 'VIEW',
  Edit = 'EDIT',
}

export type ProfileConfig = {
  address: string;
  elements: Node[];
};
