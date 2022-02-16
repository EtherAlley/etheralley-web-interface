import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ProfileMode } from '../../common/constants';
import { fetchAPI, fetchAPINoResponse } from '../../common/http';
import { BadgeTypes, DisplayGroup, Profile } from '../../common/types';

export interface State {
  loading: boolean;
  error: boolean;
  profileMode: ProfileMode;
  profile: Profile;
}

const initialState: State = {
  loading: true,
  error: false,
  profileMode: ProfileMode.View,
  profile: {
    ens_name: '',
    display_config: {
      header: { text: '' },
      description: { text: '' },
      picture: {
        item: undefined,
      },
      achievements: [],
      groups: [
        {
          text: '',
          items: [
            {
              id: 0,
              type: undefined,
            },
            {
              id: 2,
              type: undefined,
            },
            {
              id: 3,
              type: undefined,
            },
            {
              id: 4,
              type: undefined,
            },
            {
              id: 5,
              type: undefined,
            },
            {
              id: 6,
              type: undefined,
            },
          ],
        },
      ],
    },
    interactions: [],
    non_fungible_tokens: [],
    fungible_tokens: [],
    statistics: [],
  },
};

export const loadProfile = createAsyncThunk<Profile, { address: string }, { state: RootState }>(
  'profile/load',
  async ({ address }) => {
    return fetchAPI<Profile>(`/profiles/${address}`);
  }
);

export const saveProfile = createAsyncThunk<void, { address: string; library: any }, { state: RootState }>(
  'profile/save',
  async ({ address, library }, { getState }) => {
    const { profilePage } = getState();

    const { message } = await fetchAPI<{ message: string }>(`/challenges/${address}`);

    const signer = library.getSigner(address);
    const signature = await signer.signMessage(message);

    await fetchAPINoResponse(`/profiles/${address}`, {
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
      .addCase(loadProfile.pending, () => {
        return initialState;
      })
      .addCase(loadProfile.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.profile = { ...state.profile, ...action.payload };
        if (!action.payload.display_config) {
          buildDefaultConfig(state.profile, action.payload); // TODO
        }
      })
      .addCase(saveProfile.fulfilled, (state, _) => {
        state.profileMode = ProfileMode.View;
      });
  },
});

function buildDefaultConfig(stateProfile: Profile, actionProfile: Profile): void {
  stateProfile.display_config.header.text = 'My Profile';
  stateProfile.display_config.description.text = 'A really long description goes here.';
  stateProfile.display_config.groups = [];

  for (let i = 0; i < actionProfile.interactions.length; i++) {
    stateProfile.display_config.achievements.push({
      id: i,
    });
  }

  if (actionProfile.statistics.length > 0) {
    const group: DisplayGroup = {
      text: 'Stats',
      items: [],
    };
    for (let i = 0; i < actionProfile.statistics.length; i++) {
      group.items.push({
        id: i,
        type: BadgeTypes.Statistics,
      });
    }
    stateProfile.display_config.groups.push(group);
  }

  if (actionProfile.non_fungible_tokens.length > 0) {
    stateProfile.display_config.picture.item = {
      id: 0,
      type: BadgeTypes.NonFungibleToken,
    };
    const group: DisplayGroup = {
      text: 'Non Fungibles',
      items: [],
    };
    for (let i = 0; i < actionProfile.non_fungible_tokens.length; i++) {
      group.items.push({
        id: i,
        type: BadgeTypes.NonFungibleToken,
      });
    }
    stateProfile.display_config.groups.push(group);
  }

  if (actionProfile.fungible_tokens.length > 0) {
    const group: DisplayGroup = {
      text: 'Tokens',
      items: [],
    };
    for (let i = 0; i < actionProfile.fungible_tokens.length; i++) {
      group.items.push({
        id: i,
        type: BadgeTypes.FungibleToken,
      });
    }
    stateProfile.display_config.groups.push(group);
  }
}

export const { setProfileMode } = slice.actions;

export const selectLoading = (state: RootState) => state.profilePage.loading;

export const selectError = (state: RootState) => state.profilePage.error;

export const selectProfileMode = (state: RootState) => state.profilePage.profileMode;

export const selectDisplayConfig = (state: RootState) => state.profilePage.profile.display_config;

export const selectENSName = (state: RootState) => state.profilePage.profile.ens_name;

export const selectNonFungibleTokens = (state: RootState) => state.profilePage.profile.non_fungible_tokens;

export const selectNonFungibleToken = (state: RootState, index: number) =>
  state.profilePage.profile.non_fungible_tokens[index];

export const selectFungibleToken = (state: RootState, index: number) =>
  state.profilePage.profile.fungible_tokens[index];

export const selectStatistic = (state: RootState, index: number) => state.profilePage.profile.statistics[index];

export const selectInteraction = (state: RootState, index: number) => state.profilePage.profile.interactions[index];

export default slice.reducer;
