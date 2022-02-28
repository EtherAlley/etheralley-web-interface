import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { fetchAPI, fetchAPINoResponse } from '../../common/http';
import { AchievementTypes, BadgeTypes, DisplayGroup, DisplayItem, Profile } from '../../common/types';
import { onDragDrop } from '../../providers/DragDropProvider/slice';
import { nanoid } from 'nanoid';
import { AsyncStates } from '../../common/constants';
import { getFungibleToken, getNonFungibleToken, getStatistic } from './BadgeFormModal/slice';

export interface State {
  loadProfileState: AsyncStates;
  saveProfileState: AsyncStates;
  showEditBar: boolean;
  profile: Profile;
}

const initialState: State = {
  loadProfileState: AsyncStates.PENDING,
  saveProfileState: AsyncStates.READY,
  showEditBar: false,
  profile: {
    address: '',
    ens_name: '',
    display_config: {
      colors: {
        primary: '',
        secondary: '',
        primary_text: '',
        secondary_text: '',
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
    openEditBar: (state) => {
      state.showEditBar = true;
    },
    closeEditBar: (state) => {
      state.showEditBar = false;
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
      state.profile.display_config.colors.primary_text = action.payload;
    },
    updateSecondaryTextColor: (state, action: PayloadAction<string>) => {
      state.profile.display_config.colors.secondary_text = action.payload;
    },
    updateGroupText: (state, action: PayloadAction<{ index: number; text: string }>) => {
      state.profile.display_config.groups[action.payload.index].text = action.payload.text;
    },
    addGroup: (state) => {
      state.profile.display_config.groups = [
        { id: nanoid(), text: '', items: [] },
        ...state.profile.display_config.groups,
      ];
    },
    removeGroup: (state, action: PayloadAction<number>) => {
      const groups = state.profile.display_config.groups;
      removeAssets(state, groups[action.payload].items);
      groups.splice(action.payload, 1);
    },
    removeItem: (state, action: PayloadAction<{ groupArrayIndex: number; itemArrayIndex: number }>) => {
      const group = state.profile.display_config.groups[action.payload.groupArrayIndex];
      removeAssets(state, [group.items[action.payload.itemArrayIndex]]);
      group.items.splice(action.payload.itemArrayIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, () => {
        return initialState;
      })
      .addCase(loadProfile.rejected, (state) => {
        state.loadProfileState = AsyncStates.REJECTED;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loadProfileState = AsyncStates.FULFILLED;
        state.profile = { ...state.profile, ...action.payload };
        if (!action.payload.display_config) {
          buildDefaultDisplayConfig(state.profile, action.payload); // TODO
        }
      })
      .addCase(saveProfile.pending, (state, _) => {
        state.saveProfileState = AsyncStates.PENDING;
      })
      .addCase(saveProfile.rejected, (state, _) => {
        state.saveProfileState = AsyncStates.REJECTED;
      })
      .addCase(saveProfile.fulfilled, (state, _) => {
        state.saveProfileState = AsyncStates.FULFILLED;
        state.showEditBar = false;
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
      })
      .addCase(getNonFungibleToken.fulfilled, (state, { payload }) => {
        const groups = state.profile.display_config.groups;
        const item = {
          id: nanoid(),
          index: state.profile.non_fungible_tokens.length,
          type: BadgeTypes.NonFungibleToken,
        };
        state.profile.non_fungible_tokens.push(payload);
        if (groups.length === 0) {
          groups.push({
            id: nanoid(),
            text: '',
            items: [item],
          });
        } else {
          groups[0].items = [item, ...groups[0].items];
        }
      })
      .addCase(getFungibleToken.fulfilled, (state, { payload }) => {
        const groups = state.profile.display_config.groups;
        const item = {
          id: nanoid(),
          index: state.profile.fungible_tokens.length,
          type: BadgeTypes.FungibleToken,
        };
        state.profile.fungible_tokens.push(payload);
        if (groups.length === 0) {
          groups.push({
            id: nanoid(),
            text: '',
            items: [item],
          });
        } else {
          groups[0].items = [item, ...groups[0].items];
        }
      })
      .addCase(getStatistic.fulfilled, (state, { payload }) => {
        const groups = state.profile.display_config.groups;
        const item = {
          id: nanoid(),
          index: state.profile.statistics.length,
          type: BadgeTypes.Statistics,
        };
        state.profile.statistics.push(payload);
        if (groups.length === 0) {
          groups.push({
            id: nanoid(),
            text: '',
            items: [item],
          });
        } else {
          groups[0].items = [item, ...groups[0].items];
        }
      });
  },
});

function buildDefaultDisplayConfig(stateProfile: Profile, actionProfile: Profile): void {
  stateProfile.display_config.text.title = '💎 My Profile 💎';
  stateProfile.display_config.text.description = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat.
  `;
  stateProfile.display_config.colors = {
    primary: '#121212',
    secondary: '#1a1a1b',
    primary_text: '#FFF',
    secondary_text: '#FFF',
  };
  stateProfile.display_config.groups = [];

  for (let i = 0; i < actionProfile.interactions.length; i++) {
    stateProfile.display_config.achievements.push({
      index: i,
      type: AchievementTypes.Interactions,
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

function removeAssets(state: State, itemsBeingDeleted: DisplayItem[]) {
  for (const itemBeingDeleted of itemsBeingDeleted) {
    // dont remove the asset if the picture still points to it
    if (
      itemBeingDeleted.type === BadgeTypes.NonFungibleToken &&
      itemBeingDeleted.index === state.profile.display_config.picture.item?.index
    ) {
      continue;
    }

    // fix the pointers of all other items that are affected by the asset type being removed from the array
    for (const group of state.profile.display_config.groups) {
      for (const item of group.items) {
        if (item.type === itemBeingDeleted.type && item.index > itemBeingDeleted.index) {
          item.index--;
        }
      }
    }

    // remove the assets from the array
    switch (itemBeingDeleted.type) {
      case BadgeTypes.FungibleToken:
        state.profile.fungible_tokens.splice(itemBeingDeleted.index, 1);
        break;
      case BadgeTypes.NonFungibleToken:
        state.profile.non_fungible_tokens.splice(itemBeingDeleted.index, 1);
        break;
      case BadgeTypes.Statistics:
        state.profile.statistics.splice(itemBeingDeleted.index, 1);
        break;
    }
  }
}

export const selectLoading = (state: RootState) => state.profilePage.loadProfileState === AsyncStates.PENDING;

export const selectError = (state: RootState) => state.profilePage.loadProfileState === AsyncStates.REJECTED;

export const selectSaving = (state: RootState) => state.profilePage.saveProfileState === AsyncStates.PENDING;

export const selectShowEditBar = (state: RootState) => state.profilePage.showEditBar;

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

export const {
  openEditBar,
  closeEditBar,
  updateProfileTitle,
  updateProfileDescription,
  updatePrimaryColor,
  updateSecondaryColor,
  updatePrimaryTextColor,
  updateSecondaryTextColor,
  updateGroupText,
  addGroup,
  removeGroup,
  removeItem,
} = slice.actions;
