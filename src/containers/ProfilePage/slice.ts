import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { FetchProfilesAPI, Result } from '../../common/http';
import {
  AchievementTypes,
  BadgeTypes,
  Currency,
  DisplayConfig,
  DisplayGroup,
  DisplayItem,
  FungibleToken,
  NonFungibleToken,
  Profile,
  Statistic,
} from '../../common/types';
import { onDragDrop } from '../../providers/DragDropProvider/slice';
import { nanoid } from 'nanoid';
import { AsyncStates, Toasts, ToastStatuses } from '../../common/constants';
import {
  getAchievement,
  getCurrency,
  getFungibleToken,
  getNonFungibleToken,
  getProfilePicture,
  getStatistic,
} from './ModalForms/slice';
import { showToast } from '../App/slice';
import { signMessage } from '../WalletManager/slice';
import { Signer } from '@wagmi/core';

export type StateProfile = Profile & { display_config: DisplayConfig }; // display config is never undefined in the state so we override the typing

export interface State {
  loadProfileState: AsyncStates;
  profileNotFound: boolean;
  profileBanned: boolean;
  saveProfileState: AsyncStates;
  showEditBar: boolean;
  profile: StateProfile;
  hiddenBadges: { [x: string]: boolean };
}

// some pre-amble about the relationship between display_config and interactions/non_fungible_tokens/fungible_tokens/statistics:
//
// picture, groups and achievements maintain pointers to objects within the above mentioned arrays
// with the current code, no two items within the display config should point to the same item in the arrays
// that means that a picture pointing to an nft and a group item pointing to the same nft should be two distinct objects in the non_fungible_tokens array
// this design is because the logic for adding/removing items from the arrays does not account for shared pointers and is more complicated than I want to support right now
// it is slightly less optimal for us on the backend because we have to make external calls to validate/hydrate the same nft twice but I'm okay with this for now.
const initialState: State = {
  loadProfileState: AsyncStates.PENDING,
  profileNotFound: false,
  profileBanned: false,
  saveProfileState: AsyncStates.READY,
  showEditBar: false,
  profile: {
    address: '',
    ens_name: '',
    store_assets: {
      premium: false,
      beta_tester: false,
    },
    profile_picture: undefined,
    display_config: {
      colors: {
        primary: '',
        secondary: '',
        accent: '',
        shadow: '',
        primary_text: '',
        secondary_text: '',
      },
      info: {
        title: '',
        description: '',
        twitter_handle: '',
      },
      achievements: {
        text: '',
        items: [],
      },
      groups: [
        // rendering a group with hard coded items to show a loading skeleton
        {
          id: nanoid(),
          text: '',
          items: [
            {
              id: nanoid(),
              index: 0,
              type: BadgeTypes.FungibleToken,
            },
            {
              id: nanoid(),
              index: 1,
              type: BadgeTypes.FungibleToken,
            },
            {
              id: nanoid(),
              index: 2,
              type: BadgeTypes.FungibleToken,
            },
            {
              id: nanoid(),
              index: 3,
              type: BadgeTypes.FungibleToken,
            },
            {
              id: nanoid(),
              index: 4,
              type: BadgeTypes.FungibleToken,
            },
            {
              id: nanoid(),
              index: 5,
              type: BadgeTypes.FungibleToken,
            },
          ],
        },
      ],
    },
    interactions: [],
    non_fungible_tokens: [],
    fungible_tokens: [],
    statistics: [],
    currencies: [],
    last_modified: undefined,
  },
  hiddenBadges: {}, // these badge ids will be hidden during rendering
};

export const loadProfile = createAsyncThunk<
  Result<Profile>,
  { address: string; account: string | null | undefined },
  { state: RootState }
>('profile/load', async ({ address }) => {
  return FetchProfilesAPI<Profile>(`/profiles/${address}`);
});

export const saveProfile = createAsyncThunk<void, { address: string; signer: Signer }, { state: RootState }>(
  'profile/save',
  async ({ address, signer }, { getState, dispatch }) => {
    try {
      const { profilePage } = getState();

      const signature = await dispatch(signMessage({ address, signer })).unwrap();

      const result = await FetchProfilesAPI<void>(`/profiles/${address}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${signature}`,
        },
        method: 'PUT',
        body: JSON.stringify(profilePage.profile),
      });

      if (result.error) {
        throw new Error('error saving profile');
      }

      dispatch(showToast({ toast: Toasts.SUCCESS_SAVING_PROFILE, status: ToastStatuses.SUCCESS }));
    } catch (ex) {
      dispatch(showToast({ toast: Toasts.ERROR_SAVING_PROFILE, status: ToastStatuses.ERROR }));
      console.error(ex);
      throw ex;
    }
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
      state.profile.display_config.info.title = action.payload;
    },
    updateProfileDescription: (state, action: PayloadAction<string>) => {
      state.profile.display_config.info.description = action.payload;
    },
    updateProfileTwitterhandle: (state, action: PayloadAction<string>) => {
      state.profile.display_config.info.twitter_handle = action.payload;
    },
    updatePrimaryColor: (state, action: PayloadAction<string>) => {
      state.profile.display_config.colors.primary = action.payload;
    },
    updateSecondaryColor: (state, action: PayloadAction<string>) => {
      state.profile.display_config.colors.secondary = action.payload;
    },
    updateAccentColor: (state, action: PayloadAction<string>) => {
      state.profile.display_config.colors.accent = action.payload;
    },
    updateShadowColor: (state, action: PayloadAction<string>) => {
      state.profile.display_config.colors.shadow = action.payload;
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
      for (const itemBeingDeleted of groups[action.payload].items) {
        removeBadge(state, itemBeingDeleted);
      }
      groups.splice(action.payload, 1);
    },
    removeItem: (state, action: PayloadAction<{ groupArrayIndex: number; itemArrayIndex: number }>) => {
      const group = state.profile.display_config.groups[action.payload.groupArrayIndex];
      removeBadge(state, group.items[action.payload.itemArrayIndex]);
      group.items.splice(action.payload.itemArrayIndex, 1);
    },
    updateAchievementText: (state, action: PayloadAction<string>) => {
      state.profile.display_config.achievements.text = action.payload;
    },
    removeAchievement: (state, action: PayloadAction<number>) => {
      const achievements = state.profile.display_config.achievements.items;
      const achievementBeingDeleted = achievements[action.payload];
      for (const achievement of achievements) {
        if (achievement.type === achievementBeingDeleted.type && achievement.index > achievementBeingDeleted.index) {
          achievement.index--;
        }
      }
      achievements.splice(action.payload, 1);
      state.profile[achievementBeingDeleted.type].splice(achievementBeingDeleted.index, 1);
    },
    hideBadge: (state, action: PayloadAction<string>) => {
      state.hiddenBadges[action.payload] = true;
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
      .addCase(
        loadProfile.fulfilled,
        (
          state,
          {
            payload,
            meta: {
              arg: { account },
            },
          }
        ) => {
          if (payload.error && payload.error.status === 404) {
            state.loadProfileState = AsyncStates.REJECTED;
            state.profileNotFound = true;
            return;
          }

          if (payload.error && payload.error.status === 403) {
            state.loadProfileState = AsyncStates.REJECTED;
            state.profileBanned = true;
            return;
          }

          if (!payload.data) {
            state.loadProfileState = AsyncStates.REJECTED;
            return;
          }

          const profile = payload.data;

          // open the edit bar if they are loading their own profile and they have not saved it yet
          if (!profile.last_modified && account && account.toLowerCase() === profile.address.toLowerCase()) {
            state.showEditBar = true;
          }

          state.loadProfileState = AsyncStates.FULFILLED;
          state.profile.address = profile.address;
          state.profile.ens_name = profile.ens_name;
          state.profile.profile_picture = profile.profile_picture;
          state.profile.store_assets = profile.store_assets;
          state.profile.non_fungible_tokens = profile.non_fungible_tokens;
          state.profile.fungible_tokens = profile.fungible_tokens;
          state.profile.statistics = profile.statistics;
          state.profile.interactions = profile.interactions;
          state.profile.currencies = profile.currencies;
          if (!profile.display_config) {
            buildDefaultDisplayConfig(state.profile, profile);
          } else {
            state.profile.display_config = profile.display_config;
          }
        }
      )
      .addCase(saveProfile.pending, (state) => {
        state.saveProfileState = AsyncStates.PENDING;
      })
      .addCase(saveProfile.rejected, (state) => {
        state.saveProfileState = AsyncStates.REJECTED;
      })
      .addCase(saveProfile.fulfilled, (state) => {
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
        addBadge(state, BadgeTypes.NonFungibleToken, payload);
      })
      .addCase(getFungibleToken.fulfilled, (state, { payload }) => {
        addBadge(state, BadgeTypes.FungibleToken, payload);
      })
      .addCase(getStatistic.fulfilled, (state, { payload }) => {
        addBadge(state, BadgeTypes.Statistics, payload);
      })
      .addCase(getCurrency.fulfilled, (state, { payload }) => {
        addBadge(state, BadgeTypes.Currencies, payload);
      })
      .addCase(getProfilePicture.fulfilled, (state, { payload }) => {
        state.profile.profile_picture = payload;
      })
      .addCase(getAchievement.fulfilled, (state, { payload }) => {
        state.profile.interactions.push(payload);
        state.profile.display_config.achievements.items.push({
          id: nanoid(),
          index: state.profile.interactions.length - 1,
          type: AchievementTypes.Interactions,
        });
      });
  },
});

// build a pleasant display config when the user does not have one configured
function buildDefaultDisplayConfig(stateProfile: StateProfile, actionProfile: Profile): void {
  stateProfile.display_config.info.title = '';
  stateProfile.display_config.info.description = '';
  stateProfile.display_config.colors = {
    primary: '#121212',
    secondary: '#1a1a1b',
    accent: '#36e2bc',
    shadow: '#000000',
    primary_text: '#F7F5F2',
    secondary_text: '#F7F5F2',
  };
  stateProfile.display_config.groups = [];

  if (actionProfile.store_assets.beta_tester || actionProfile.interactions.length > 0) {
    stateProfile.display_config.achievements.text = 'Achievements';
    for (let i = 0; i < actionProfile.interactions.length; i++) {
      stateProfile.display_config.achievements.items.push({
        id: nanoid(),
        index: i,
        type: AchievementTypes.Interactions,
      });
    }
  }

  if (actionProfile.profile_picture) {
    stateProfile.profile_picture = actionProfile.profile_picture;
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
    const group: DisplayGroup = {
      id: nanoid(),
      text: 'NFTs',
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

  if (actionProfile.currencies.length > 0) {
    const group: DisplayGroup = {
      id: nanoid(),
      text: 'Currencies',
      items: [],
    };
    for (let i = 0; i < actionProfile.currencies.length; i++) {
      group.items.push({
        id: nanoid(),
        index: i,
        type: BadgeTypes.Currencies,
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

// fix the pointers of all other items that are affected by the badge type being removed from the array
// splice the item being deleted out of the array for the given badge type
function removeBadge(state: State, itemBeingDeleted: DisplayItem) {
  for (const group of state.profile.display_config.groups) {
    for (const item of group.items) {
      if (item.type === itemBeingDeleted.type && item.index > itemBeingDeleted.index) {
        item.index--;
      }
    }
  }

  state.profile[itemBeingDeleted.type].splice(itemBeingDeleted.index, 1);
}

// add the badge to the bottom of the specified badge type array
// add an item at the front of the first group
// if the group does not exist, create one
function addBadge(state: State, type: BadgeTypes, badge: Currency | Statistic | FungibleToken | NonFungibleToken) {
  const badgeArr = state.profile[type] as unknown as typeof badge[];
  badgeArr.push(badge);
  const groups = state.profile.display_config.groups;
  const item = {
    id: nanoid(),
    index: state.profile[type].length - 1,
    type,
  };
  if (groups.length === 0) {
    groups.push({
      id: nanoid(),
      text: '',
      items: [item],
    });
  } else {
    groups[0].items = [item, ...groups[0].items];
  }
}

export const selectLoading = (state: RootState) => state.profilePage.loadProfileState === AsyncStates.PENDING;

export const selectError = (state: RootState) => state.profilePage.loadProfileState === AsyncStates.REJECTED;

export const selectSaving = (state: RootState) => state.profilePage.saveProfileState === AsyncStates.PENDING;

export const selectProfileNotFound = (state: RootState) => state.profilePage.profileNotFound;

export const selectProfileBanned = (state: RootState) => state.profilePage.profileBanned;

export const selectShowEditBar = (state: RootState) => state.profilePage.showEditBar;

export const selectInfo = (state: RootState) => state.profilePage.profile.display_config.info;

export const selectColors = (state: RootState) => state.profilePage.profile.display_config.colors;

export const selectPicture = (state: RootState) => state.profilePage.profile.profile_picture;

export const selectGroups = (state: RootState) => state.profilePage.profile.display_config.groups;

export const selectAchievements = (state: RootState) => state.profilePage.profile.display_config.achievements;

export const selectAddress = (state: RootState) => state.profilePage.profile.address;

export const selectENSName = (state: RootState) => state.profilePage.profile.ens_name;

export const selectStoreAssets = (state: RootState) => state.profilePage.profile.store_assets;

export const selectNonFungibleTokens = (state: RootState) => state.profilePage.profile.non_fungible_tokens;

export const selectNonFungibleToken = (state: RootState, index: number) =>
  state.profilePage.profile.non_fungible_tokens[index];

export const selectFungibleToken = (state: RootState, index: number) =>
  state.profilePage.profile.fungible_tokens[index];

export const selectStatistic = (state: RootState, index: number) => state.profilePage.profile.statistics[index];

export const selectInteraction = (state: RootState, index: number) => state.profilePage.profile.interactions[index];

export const selectCurrency = (state: RootState, index: number) => state.profilePage.profile.currencies[index];

export const selectBadgeCount = (state: RootState) =>
  state.profilePage.profile.fungible_tokens.length +
  state.profilePage.profile.non_fungible_tokens.length +
  state.profilePage.profile.currencies.length +
  state.profilePage.profile.statistics.length;

export const selectInteractions = (state: RootState) => state.profilePage.profile.interactions;

export const selectHiddenBadges = (state: RootState) => state.profilePage.hiddenBadges;

export default slice.reducer;

export const {
  openEditBar,
  closeEditBar,
  updateProfileTitle,
  updateProfileDescription,
  updateProfileTwitterhandle,
  updatePrimaryColor,
  updateSecondaryColor,
  updateAccentColor,
  updateShadowColor,
  updatePrimaryTextColor,
  updateSecondaryTextColor,
  updateGroupText,
  addGroup,
  removeGroup,
  removeItem,
  updateAchievementText,
  removeAchievement,
  hideBadge,
} = slice.actions;
