import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ProfileMode } from '../../common/constants';
import { fetchAPI, fetchAPINoResponse } from '../../common/http';
import { BadgeTypes, DisplayGroup, Profile } from '../../common/types';
import { onDragDrop } from '../DragDropProvider/slice';
import { nanoid } from 'nanoid';

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
        primary: '',
        secondary: '',
        primaryText: '',
        secondaryText: '',
      },
      text: {
        title: '',
        description: '',
      },
      picture: {
        item: undefined,
      },
      achievements: [],
      groups: [],
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
    updateProfileTitle: (state, action: PayloadAction<string>) => {
      state.profile.display_config.text.title = action.payload;
    },
    updateProfileDescription: (state, action: PayloadAction<string>) => {
      state.profile.display_config.text.description = action.payload;
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
    updateGroupText: (state, action: PayloadAction<{ index: number; text: string }>) => {
      state.profile.display_config.groups[action.payload.index].text = action.payload.text;
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
          buildDefaultDisplayConfig(state.profile, action.payload); // TODO
        }
      })
      .addCase(saveProfile.fulfilled, (state, _) => {
        state.profileMode = ProfileMode.View;
      })
      .addCase(onDragDrop, (state, { payload }) => {
        const { source, destination } = payload;

        if (!destination) {
          return;
        }

        const sourceGroupId = +source.droppableId;
        const destinationGroupId = +destination.droppableId;
        const sourceGroup = state.profile.display_config.groups[sourceGroupId].items;
        const destinationGroup = state.profile.display_config.groups[destinationGroupId].items;

        if (sourceGroupId === destinationGroupId) {
          const [removed] = sourceGroup.splice(source.index, 1);
          sourceGroup.splice(destination.index, 0, removed);
        } else {
          const [removed] = sourceGroup.splice(source.index, 1);
          destinationGroup.splice(destination.index, 0, removed);
        }
      });
  },
});

function buildDefaultDisplayConfig(stateProfile: Profile, actionProfile: Profile): void {
  stateProfile.display_config.text.title = 'My Profile 💎';
  stateProfile.display_config.text.description = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat.
  `;
  stateProfile.display_config.colors = {
    primary: '#121212',
    secondary: '#1a1a1b',
    primaryText: '#FFF',
    secondaryText: '#FFF',
  };
  stateProfile.display_config.groups = [];

  for (let i = 0; i < actionProfile.interactions.length; i++) {
    stateProfile.display_config.achievements.push({
      index: i,
    });
  }

  if (actionProfile.statistics.length > 0) {
    const group: DisplayGroup = {
      id: nanoid(),
      text: 'Stats',
      items: [],
    };
    for (let i = 0; i < actionProfile.statistics.length; i++) {
      group.items.push({
        id: nanoid(),
        index: i,
        type: BadgeTypes.Statistics,
      });
    }
    stateProfile.display_config.groups.push(group);
  }

  if (actionProfile.non_fungible_tokens.length > 0) {
    stateProfile.display_config.picture.item = {
      id: nanoid(),
      index: 0,
      type: BadgeTypes.NonFungibleToken,
    };
    const group: DisplayGroup = {
      id: nanoid(),
      text: 'Non Fungibles',
      items: [],
    };
    for (let i = 0; i < actionProfile.non_fungible_tokens.length; i++) {
      group.items.push({
        id: nanoid(),
        index: i,
        type: BadgeTypes.NonFungibleToken,
      });
    }
    stateProfile.display_config.groups.push(group);
  }

  if (actionProfile.fungible_tokens.length > 0) {
    const group: DisplayGroup = {
      id: nanoid(),
      text: 'Tokens',
      items: [],
    };
    for (let i = 0; i < actionProfile.fungible_tokens.length; i++) {
      group.items.push({
        id: nanoid(),
        index: i,
        type: BadgeTypes.FungibleToken,
      });
    }
    stateProfile.display_config.groups.push(group);
  }
}

export const {
  setProfileMode,
  updateProfileTitle,
  updateProfileDescription,
  updatePrimaryColor,
  updateSecondaryColor,
  updatePrimaryTextColor,
  updateSecondaryTextColor,
  updateGroupText,
} = slice.actions;

export const selectLoading = (state: RootState) => state.profilePage.loading;

export const selectError = (state: RootState) => state.profilePage.error;

export const selectProfileMode = (state: RootState) => state.profilePage.profileMode;

export const selectText = (state: RootState) => state.profilePage.profile.display_config.text;

export const selectColors = (state: RootState) => state.profilePage.profile.display_config.colors;

export const selectPicture = (state: RootState) => state.profilePage.profile.display_config.picture;

export const selectGroups = (state: RootState) => state.profilePage.profile.display_config.groups;

export const selectAchievements = (state: RootState) => state.profilePage.profile.display_config.achievements;

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
