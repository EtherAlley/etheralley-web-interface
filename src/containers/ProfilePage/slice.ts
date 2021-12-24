import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Contract } from '@ethersproject/contracts';
import { RootState } from '../../store';
import { ContractABI, ProfileConfig, ProfileMode } from '../../constants';
import { defaultConfig, fromIPFSToProfileConfig } from './transformers';

export interface State {
  loading: boolean;
  error: boolean;
  profileMode: ProfileMode;
  profileConfig: ProfileConfig | undefined;
  currentNodeId: string | undefined;
}

const initialState: State = {
  loading: true,
  error: false,
  profileMode: ProfileMode.View,
  profileConfig: undefined,
  currentNodeId: undefined,
};

//TODO:
const contractAddres = '0xd50d3F16F89a3B0028Cb3069d9979d78Dc11435A';

export const loadProfile = createAsyncThunk<ProfileConfig, { library: any; address: string }, any>(
  'profile/load',
  async ({ library, address }) => {
    const contract = new Contract(contractAddres, ContractABI, library);
    const hash: string = await contract.getProfile(address);
    if (hash) {
      const response = await fetch(`https://ipfs.infura.io:5001/api/v0/cat?arg=${hash}`, {
        method: 'GET',
      });
      const data = await response.text();
      return fromIPFSToProfileConfig(data);
    }
    return defaultConfig();
  }
);

export const saveProfile = createAsyncThunk<void, { library: any; account: string; profileConfig: ProfileConfig }, any>(
  'profile/save',
  async ({ library, account, profileConfig }) => {
    const contract = new Contract(contractAddres, ContractABI, library.getSigner(account).connectUnchecked());
    const formData = new FormData();
    formData.append('document', JSON.stringify(profileConfig));

    const response = await fetch(`https://ipfs.infura.io:5001/api/v0/add`, {
      method: 'POST',
      body: formData,
    });
    const { Hash } = await response.json();

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
    setCurrentSelectedNode: (state, action: PayloadAction<string | undefined>) => {
      state.currentNodeId = action.payload;
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

export const { setProfileMode, setCurrentSelectedNode } = slice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default slice.reducer;
