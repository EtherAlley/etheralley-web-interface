import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ProfileMode } from '../../common/constants';
import { fetchCoreAPI } from '../../api';
import { BadgeTypes, DisplayConfig, DisplayGroup, Profile } from '../../api/types';

export interface State {
  loading: boolean;
  error: boolean;
  profileMode: ProfileMode;
  profile: Profile | undefined;
}

const initialState: State = {
  loading: true,
  error: false,
  profileMode: ProfileMode.View,
  profile: undefined,
};

export const loadProfile = createAsyncThunk<Profile, { address: string }, { state: RootState }>(
  'profile/load',
  async ({ address }) => {
    const response = await fetchCoreAPI(`/profiles/${address}`);
    const profile = await response.json();
    return profile;
  }
);

export const saveProfile = createAsyncThunk<void, { address: string; library: any }, { state: RootState }>(
  'profile/save',
  async ({ address, library }, { getState }) => {
    const { profilePage } = getState();

    const response = await fetchCoreAPI(`/challenges/${address}`);
    const { message } = await response.json();

    const signer = library.getSigner(address);
    const signature = await signer.signMessage(message);

    await fetchCoreAPI(`/profiles/${address}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${signature}`,
      },
      method: 'PUT',
      body: JSON.stringify(profilePage.profile),
    });
  }
);

export const slice = createSlice({
  name: 'profilePage',
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
        state.profile = action.payload;
        state.profile.display_config = buildDefaultConfig(action.payload); // TODO
      })
      .addCase(saveProfile.fulfilled, (state, _) => {
        state.profileMode = ProfileMode.View;
      });
  },
});

export const { setProfileMode } = slice.actions;

export const selectProfile = (state: RootState) => state.profilePage;

export default slice.reducer;

function buildDefaultConfig(profile: Profile): DisplayConfig {
  const display: DisplayConfig = {
    header: { text: 'My Profile' },
    description: { text: 'My Description is very long and goes here.' },
    picture: {
      item: undefined,
    },
    groups: [],
  };

  if (profile.statistics.length > 0) {
    const group: DisplayGroup = {
      text: 'Statistics',
      items: [],
    };
    for (let i = 0; i < profile.statistics.length; i++) {
      group.items.push({
        id: i,
        type: BadgeTypes.Statistics,
      });
    }
    display.groups.push(group);
  }

  if (profile.non_fungible_tokens.length > 0) {
    display.picture.item = {
      id: 2,
      type: BadgeTypes.NonFungibleToken,
    };
    const group: DisplayGroup = {
      text: 'Non Fungible Tokens',
      items: [],
    };
    for (let i = 0; i < profile.non_fungible_tokens.length; i++) {
      group.items.push({
        id: i,
        type: BadgeTypes.NonFungibleToken,
      });
    }
    display.groups.push(group);
  }

  if (profile.fungible_tokens.length > 0) {
    const group: DisplayGroup = {
      text: 'Tokens',
      items: [],
    };
    for (let i = 0; i < profile.fungible_tokens.length; i++) {
      group.items.push({
        id: i,
        type: BadgeTypes.FungibleToken,
      });
    }
    display.groups.push(group);
  }

  return display;
}
