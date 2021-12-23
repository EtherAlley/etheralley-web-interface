import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import axios from 'axios';
import { Contract } from '@ethersproject/contracts';
import { ContractABI, ProfileMode } from '../../constants';

export interface State {
  loading: boolean;
  error: boolean;
  profileMode: ProfileMode;
  profileConfig: undefined | any;
}

const initialState: State = {
  loading: true,
  error: false,
  profileMode: ProfileMode.View,
  profileConfig: undefined,
};

//TODO:
const contractAddres = '0xd50d3F16F89a3B0028Cb3069d9979d78Dc11435A';

function fromHash(hash: any): any {
  return hash;
}

function toHash(profileConfig: any): string {
  return JSON.stringify({
    elements: [
      {
        id: '1',
        data: { label: 'Node 1' },
        position: { x: 250, y: 25 },
      },
      {
        id: '2',
        data: { label: 'Node 2' },
        position: { x: 100, y: 125 },
      },
      {
        id: '3',
        data: { label: 'Node 3' },
        position: { x: 250, y: 250 },
      },
    ],
  });
}

export const loadProfile = createAsyncThunk<string, { library: any; address: string }, any>(
  'profile/load',
  async ({ library, address }) => {
    const contract = new Contract(contractAddres, ContractABI, library);
    const hash: string = await contract.getProfile(address);
    if (hash) {
      const { data } = await axios(`https://ipfs.infura.io:5001/api/v0/cat?arg=${hash}&encoding=json`, {
        method: 'GET',
      });
      return fromHash(data);
    }
    return undefined;
  }
);

export const saveProfile = createAsyncThunk<void, { library: any; account: string }, any>(
  'profile/save',
  async ({ library, account }, { getState }) => {
    const {
      profile: { profileConfig },
    } = getState() as any;
    const contract = new Contract(contractAddres, ContractABI, library.getSigner(account).connectUnchecked());
    const formData = new FormData();
    formData.append('document', toHash(profileConfig));
    const {
      data: { Hash },
    } = await axios(`https://ipfs.infura.io:5001/api/v0/add`, {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    await contract.setProfile(Hash);
  }
);

export const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileMode: (state, action: PayloadAction<ProfileMode>) => {
      state.profileMode = action.payload;
    },
  },
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
        state.profileConfig = action.payload;
      })
      .addCase(saveProfile.fulfilled, (state, _) => {
        state.profileMode = ProfileMode.View;
      });
  },
});

export const { setProfileMode } = slice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default slice.reducer;
