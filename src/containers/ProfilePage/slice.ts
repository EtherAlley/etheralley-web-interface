import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ProfileConfig, ProfileMode } from '../../constants';

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

export const loadProfile = createAsyncThunk<ProfileConfig, { address: string }, any>(
  'profile/load',
  async ({ address }) => {
    const response = await fetch(`${process.env.REACT_APP_CORE_API_FQDN}/profiles/${address}`, { method: 'GET' });
    const profile = await response.json();
    return profile;
  }
);

export const saveProfile = createAsyncThunk<void, { address: string; library: any; profileConfig: ProfileConfig }, any>(
  'profile/save',
  async ({ address, profileConfig, library }) => {
    const response = await fetch(`${process.env.REACT_APP_CORE_API_FQDN}/challenge/${address}`, { method: 'GET' });
    const { message } = await response.json();

    const signer = library.getSigner(address);
    const signature = await signer.signMessage(message);

    await fetch(`${process.env.REACT_APP_CORE_API_FQDN}/profiles/${address}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${signature}`,
      },
      method: 'PUT',
      body: JSON.stringify(profileConfig),
    });
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
