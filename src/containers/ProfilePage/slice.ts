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
    address: '',
    ens_name: '',
    display_config: {
      colors: {
        primary: '#121212',
        secondary: '#1a1a1b',
        primaryText: '#FFF',
        secondaryText: '#FFF',
      },
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
              id: 1,
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
    updateProfileHeader: (state, action: PayloadAction<string>) => {
      state.profile.display_config.header.text = action.payload;
    },
    updateProfileDescription: (state, action: PayloadAction<string>) => {
      state.profile.display_config.description.text = action.payload;
    },
    updatePrimaryColor: (state, action: PayloadAction<string>) => {
      state.profile.display_config.colors.primary = action.payload;
    },
    updateSecondaryColor: (state, action: PayloadAction<string>) => {
      state.profile.display_config.colors.secondary = action.payload;
    },
    updatePrimaryTextColor: (state, action: PayloadAction<string>) => {
      state.profile.display_config.colors.primaryText = action.payload;
    },
    updateSecondaryTextColor: (state, action: PayloadAction<string>) => {
      state.profile.display_config.colors.secondaryText = action.payload;
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
  stateProfile.display_config.description.text = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat.
  `;
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

export const {
  setProfileMode,
  updateProfileHeader,
  updateProfileDescription,
  updatePrimaryColor,
  updateSecondaryColor,
  updatePrimaryTextColor,
  updateSecondaryTextColor,
} = slice.actions;

export const selectLoading = (state: RootState) => state.profilePage.loading;

export const selectError = (state: RootState) => state.profilePage.error;

export const selectProfileMode = (state: RootState) => state.profilePage.profileMode;

export const selectDisplayConfig = (state: RootState) => state.profilePage.profile.display_config;

export const selectHeaderText = (state: RootState) => state.profilePage.profile.display_config.header.text;

export const selectDescriptionText = (state: RootState) => state.profilePage.profile.display_config.description.text;

export const selectColors = (state: RootState) => state.profilePage.profile.display_config.colors;

export const selectAddress = (state: RootState) => state.profilePage.profile.address;

export const selectENSName = (state: RootState) => state.profilePage.profile.ens_name;

export const selectNonFungibleTokens = (state: RootState) => state.profilePage.profile.non_fungible_tokens;

export const selectNonFungibleToken = (state: RootState, index: number) =>
  state.profilePage.profile.non_fungible_tokens[index];

export const selectFungibleToken = (state: RootState, index: number) =>
  state.profilePage.profile.fungible_tokens[index];

export const selectStatistic = (state: RootState, index: number) => state.profilePage.profile.statistics[index];

export const selectInteraction = (state: RootState, index: number) => state.profilePage.profile.interactions[index];

export default slice.reducer;
