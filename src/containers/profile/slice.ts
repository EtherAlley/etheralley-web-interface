import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import axios from 'axios';
import { Contract } from '@ethersproject/contracts';

export interface State {
  loading: boolean;
  error: boolean;
  profileTemplate: any;
}

const initialState: State = {
  loading: true,
  error: false,
  profileTemplate: {},
};
//TODO:
const contractAddres = '0xd50d3F16F89a3B0028Cb3069d9979d78Dc11435A';
const contractABI = [
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

export const loadProfile = createAsyncThunk<string, { library: any; address: string }, any>(
  'profile/load',
  async ({ library, address }) => {
    const contract = new Contract(contractAddres, contractABI, library);
    const hash: string = await contract.getProfile(address);
    if (hash) {
      const { data } = await axios(`https://ipfs.infura.io:5001/api/v0/cat?arg=${hash}&encoding=json`, {
        method: 'GET',
      });
      return data;
    } else {
      return { default: 'default profile' };
    }
  }
);

export const saveProfile = createAsyncThunk<void, { library: any; account: string }, any>(
  'profile/save',
  async ({ library, account }) => {
    const formData = new FormData();
    formData.append('document', JSON.stringify({ test: 'some test data' }));
    const {
      data: { Hash },
    } = await axios(`https://ipfs.infura.io:5001/api/v0/add`, {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const contract = new Contract(contractAddres, contractABI, library.getSigner(account).connectUnchecked());
    await contract.setProfile(Hash);
  }
);

export const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(loadProfile.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.profileTemplate = action.payload;
      });
  },
});

// export const {} = slice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default slice.reducer;
