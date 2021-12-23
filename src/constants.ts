export const Routes = {
  HOME: '/',
  PROFILE: '/profiles/:address',
};

export const INJECTED_CONTEXT_NAME = 'INJECTED';

export enum ProfileMode {
  View = 'VIEW',
  Edit = 'EDIT',
}

export const ContractABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'profile',
        type: 'address',
      },
    ],
    name: 'getProfile',
    outputs: [
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'uri',
        type: 'string',
      },
    ],
    name: 'setProfile',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
