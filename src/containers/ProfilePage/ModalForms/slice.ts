import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { BadgeTypes, Currency, FungibleToken, Interaction, NonFungibleToken, Statistic } from '../../../common/types';
import {
  Blockchains,
  Interfaces,
  AsyncStates,
  StatisticTypes,
  Toasts,
  ToastStatuses,
  ZeroAddress,
  InteractionTypes,
} from '../../../common/constants';
import { FetchProfilesAPI } from '../../../common/http';
import { showToast } from '../../App/slice';

export interface State {
  badgeModal: {
    show: boolean;
    submitState: AsyncStates;
    type: BadgeTypes | undefined;
  };
  profilePictureModal: {
    show: boolean;
    submitState: AsyncStates;
  };
  achievementModal: {
    show: boolean;
    submitState: AsyncStates;
  };
  nonFungibleForm: {
    blockchain: Blockchains | undefined;
    interface: Interfaces | undefined;
    address: string;
    token_id: string;
  };
  fungibleForm: {
    blockchain: Blockchains | undefined;
    address: string;
    keyword: string;
    submitted: boolean;
  };
  statForm: {
    blockchain: Blockchains | undefined;
    interface: Interfaces | undefined;
    type: StatisticTypes | undefined;
  };
  interactionForm: {
    blockchain: Blockchains | undefined;
    transactionId: string;
    type: InteractionTypes | undefined;
  };
  currencyForm: {
    blockchain: Blockchains | undefined;
  };
}

const initialState = (): State => ({
  badgeModal: {
    show: false,
    submitState: AsyncStates.READY,
    type: undefined,
  },
  profilePictureModal: {
    show: false,
    submitState: AsyncStates.READY,
  },
  achievementModal: {
    show: false,
    submitState: AsyncStates.READY,
  },
  nonFungibleForm: {
    blockchain: undefined,
    interface: undefined,
    address: '',
    token_id: '',
  },
  fungibleForm: {
    blockchain: undefined,
    address: '',
    keyword: '',
    submitted: false,
  },
  statForm: {
    blockchain: undefined,
    interface: undefined,
    type: undefined,
  },
  interactionForm: {
    blockchain: undefined,
    transactionId: '',
    type: undefined,
  },
  currencyForm: {
    blockchain: undefined,
  },
});

export const submitBadge = createAsyncThunk<void, undefined, { state: RootState }>(
  'forms/submitBadge',
  async (_, { dispatch, getState }) => {
    const {
      modalForms: {
        badgeModal: { type },
      },
    } = getState();
    switch (type) {
      case BadgeTypes.NonFungibleToken:
        dispatch(getNonFungibleToken());
        break;
      case BadgeTypes.FungibleToken:
        dispatch(getFungibleToken());
        break;
      case BadgeTypes.Statistics:
        dispatch(getStatistic());
        break;
      case BadgeTypes.Currencies:
        dispatch(getCurrency());
        break;
    }
  }
);

export const getNonFungibleToken = createAsyncThunk<NonFungibleToken, undefined, { state: RootState }>(
  'forms/getNonFungibleToken',
  async (_, { getState, dispatch }) => {
    const {
      modalForms: {
        nonFungibleForm: { blockchain, interface: interfaceName, address, token_id },
      },
      profilePage: { profile },
    } = getState();

    try {
      const { data, error } = await FetchProfilesAPI<NonFungibleToken>(
        `/contracts/nft?blockchain=${blockchain}&interface=${interfaceName}&contract=${address}&token_id=${token_id}&user_address=${profile.address}`
      );

      if (error || !data) {
        throw new Error('error fetching nft');
      }

      return data;
    } catch (ex) {
      dispatch(showToast({ toast: Toasts.ADDING_BADGE, status: ToastStatuses.ERROR }));
      throw ex;
    }
  }
);

export const getFungibleToken = createAsyncThunk<FungibleToken, undefined, { state: RootState }>(
  'forms/getFungibleToken',
  async (_, { getState, dispatch }) => {
    const {
      modalForms: {
        fungibleForm: { blockchain, address },
      },
      profilePage: { profile },
    } = getState();

    try {
      const { data, error } = await FetchProfilesAPI<FungibleToken>(
        `/contracts/token?blockchain=${blockchain}&interface=${Interfaces.ERC20}&contract=${address}&user_address=${profile.address}`
      );

      if (error || !data) {
        throw new Error('error fetching nft');
      }

      return data;
    } catch (ex) {
      dispatch(showToast({ toast: Toasts.ADDING_BADGE, status: ToastStatuses.ERROR }));
      throw ex;
    }
  }
);

export const getCurrency = createAsyncThunk<Currency, undefined, { state: RootState }>(
  'forms/getCurrency',
  async (_, { getState, dispatch }) => {
    const {
      modalForms: {
        currencyForm: { blockchain },
      },
      profilePage: { profile },
    } = getState();

    try {
      const { data, error } = await FetchProfilesAPI<Currency>(
        `/currency?blockchain=${blockchain}&address=${profile.address}`
      );

      if (error || !data) {
        throw new Error('error fetching nft');
      }

      return data;
    } catch (ex) {
      dispatch(showToast({ toast: Toasts.ADDING_BADGE, status: ToastStatuses.ERROR }));
      throw ex;
    }
  }
);

export const getStatistic = createAsyncThunk<Statistic, undefined, { state: RootState }>(
  'forms/getStatistic',
  async (_, { getState, dispatch }) => {
    const {
      modalForms: {
        statForm: { blockchain, interface: interfaceName, type },
      },
      profilePage: { profile },
    } = getState();

    try {
      const { data, error } = await FetchProfilesAPI<Statistic>(
        `/contracts/statistic?blockchain=${blockchain}&interface=${interfaceName}&type=${type}&user_address=${profile.address}&contract=${ZeroAddress}`
      );

      if (error || !data) {
        throw new Error('error fetching nft');
      }

      return data;
    } catch (ex) {
      dispatch(showToast({ toast: Toasts.ADDING_BADGE, status: ToastStatuses.ERROR }));
      throw ex;
    }
  }
);

export const getProfilePicture = createAsyncThunk<NonFungibleToken, undefined, { state: RootState }>(
  'forms/getProfilePicture',
  async (_, { getState, dispatch }) => {
    const {
      modalForms: {
        nonFungibleForm: { blockchain, interface: interfaceName, address, token_id },
      },
      profilePage: { profile },
    } = getState();

    try {
      const { data, error } = await FetchProfilesAPI<NonFungibleToken>(
        `/contracts/nft?blockchain=${blockchain}&interface=${interfaceName}&contract=${address}&token_id=${token_id}&user_address=${profile.address}`
      );

      if (error || !data) {
        throw new Error('error fetching nft');
      }

      return data;
    } catch (ex) {
      dispatch(showToast({ toast: Toasts.ADDING_PROFILE_PICTURE, status: ToastStatuses.ERROR }));
      throw ex;
    }
  }
);

export const getAchievement = createAsyncThunk<Interaction, undefined, { state: RootState }>(
  'forms/getAchievement',
  async (_, { getState, dispatch }) => {
    const {
      modalForms: {
        interactionForm: { blockchain, type, transactionId },
      },
      profilePage: { profile },
    } = getState();

    try {
      const { data, error } = await FetchProfilesAPI<Interaction>(
        `/transactions/interaction?blockchain=${blockchain}&type=${type}&tx_id=${transactionId}&user_address=${profile.address}`
      );

      if (error || !data) {
        throw new Error('error fetching nft');
      }

      return data;
    } catch (ex) {
      dispatch(showToast({ toast: Toasts.ADDING_ACHIEVEMENT, status: ToastStatuses.ERROR }));
      throw ex;
    }
  }
);

export const slice = createSlice({
  name: 'modalForms',
  initialState: initialState(),
  reducers: {
    openBadgeModal: () => {
      const state = initialState();
      state.badgeModal.show = true;
      return state;
    },
    closeBadgeModal: (state) => {
      state.badgeModal.show = false;
    },
    updateBadgeType: (state, action: PayloadAction<string>) => {
      state.badgeModal.type = action.payload as BadgeTypes;
    },
    openProfilePictureModal: () => {
      const state = initialState();
      state.profilePictureModal.show = true;
      return state;
    },
    closeProfilePictureModal: (state) => {
      state.profilePictureModal.show = false;
    },
    openAchievementModal: () => {
      const state = initialState();
      state.achievementModal.show = true;
      return state;
    },
    closeAchievementModal: (state) => {
      state.achievementModal.show = false;
    },
    updateNonFungibleBlockchain: (state, action: PayloadAction<string>) => {
      state.nonFungibleForm.blockchain = action.payload as Blockchains;
    },
    updateNonFungibleInterface: (state, action: PayloadAction<string>) => {
      state.nonFungibleForm.interface = action.payload as Interfaces;
    },
    updateNonFungibleAddress: (state, action: PayloadAction<string>) => {
      state.nonFungibleForm.address = action.payload;
    },
    updateNonFungibleTokenId: (state, action: PayloadAction<string>) => {
      state.nonFungibleForm.token_id = action.payload;
    },
    updateFungibleBlockchain: (state, action: PayloadAction<string>) => {
      state.fungibleForm.blockchain = action.payload as Blockchains;
    },
    updateFungibleAddress: (state, action: PayloadAction<string>) => {
      state.fungibleForm.address = action.payload;
      state.fungibleForm.keyword = '';
    },
    updateFungibleKeyword: (state, action: PayloadAction<string>) => {
      state.fungibleForm.keyword = action.payload;
      state.fungibleForm.submitted = false;
    },
    submitFungibleSearch: (state, action: PayloadAction<{ address: string; name: string }>) => {
      state.fungibleForm.address = action.payload.address;
      state.fungibleForm.keyword = action.payload.name;
      state.fungibleForm.submitted = true;
    },
    updateStatBlockchain: (state, action: PayloadAction<string>) => {
      state.statForm.blockchain = action.payload as Blockchains;
      state.statForm.interface = undefined;
    },
    updateStatInterface: (state, action: PayloadAction<string>) => {
      state.statForm.interface = action.payload as Interfaces;
      switch (action.payload) {
        case Interfaces.SUSHISWAP_EXCHANGE:
        case Interfaces.UNISWAP_V2_EXCHANGE:
        case Interfaces.UNISWAP_V3_EXCHANGE:
          state.statForm.type = StatisticTypes.SWAP;
          break;
        case Interfaces.ROCKET_POOL:
          state.statForm.type = StatisticTypes.STAKE;
          break;
      }
    },
    updateInteractionBlockchain: (state, action: PayloadAction<string>) => {
      state.interactionForm.blockchain = action.payload as Blockchains;
    },
    updateInteractionType: (state, action: PayloadAction<string>) => {
      state.interactionForm.type = action.payload as InteractionTypes;
    },
    updateInteractionTransactionId: (state, action: PayloadAction<string>) => {
      state.interactionForm.transactionId = action.payload;
    },
    updateCurrencyBlockchain: (state, action: PayloadAction<string>) => {
      state.currencyForm.blockchain = action.payload as Blockchains;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNonFungibleToken.pending, (state) => {
      state.badgeModal.submitState = AsyncStates.PENDING;
    });
    builder.addCase(getNonFungibleToken.fulfilled, (state) => {
      state.badgeModal.show = false;
      state.badgeModal.submitState = AsyncStates.FULFILLED;
    });
    builder.addCase(getNonFungibleToken.rejected, (state) => {
      state.badgeModal.submitState = AsyncStates.REJECTED;
    });
    builder.addCase(getFungibleToken.pending, (state) => {
      state.badgeModal.submitState = AsyncStates.PENDING;
    });
    builder.addCase(getFungibleToken.fulfilled, (state) => {
      state.badgeModal.show = false;
      state.badgeModal.submitState = AsyncStates.FULFILLED;
    });
    builder.addCase(getFungibleToken.rejected, (state) => {
      state.badgeModal.submitState = AsyncStates.REJECTED;
    });
    builder.addCase(getStatistic.pending, (state) => {
      state.badgeModal.submitState = AsyncStates.PENDING;
    });
    builder.addCase(getStatistic.fulfilled, (state) => {
      state.badgeModal.show = false;
      state.badgeModal.submitState = AsyncStates.FULFILLED;
    });
    builder.addCase(getStatistic.rejected, (state) => {
      state.badgeModal.submitState = AsyncStates.REJECTED;
    });
    builder.addCase(getCurrency.pending, (state) => {
      state.badgeModal.submitState = AsyncStates.PENDING;
    });
    builder.addCase(getCurrency.fulfilled, (state) => {
      state.badgeModal.show = false;
      state.badgeModal.submitState = AsyncStates.FULFILLED;
    });
    builder.addCase(getCurrency.rejected, (state) => {
      state.badgeModal.submitState = AsyncStates.REJECTED;
    });
    builder.addCase(getProfilePicture.pending, (state) => {
      state.profilePictureModal.submitState = AsyncStates.PENDING;
    });
    builder.addCase(getProfilePicture.fulfilled, (state) => {
      state.profilePictureModal.show = false;
      state.profilePictureModal.submitState = AsyncStates.FULFILLED;
    });
    builder.addCase(getProfilePicture.rejected, (state) => {
      state.profilePictureModal.submitState = AsyncStates.REJECTED;
    });
    builder.addCase(getAchievement.pending, (state) => {
      state.achievementModal.submitState = AsyncStates.PENDING;
    });
    builder.addCase(getAchievement.fulfilled, (state) => {
      state.achievementModal.show = false;
      state.achievementModal.submitState = AsyncStates.FULFILLED;
    });
    builder.addCase(getAchievement.rejected, (state) => {
      state.achievementModal.submitState = AsyncStates.REJECTED;
    });
  },
});

export const selectShowBadgeModal = (state: RootState) => state.modalForms.badgeModal.show;

export const selectBadgeSubmitting = (state: RootState) =>
  state.modalForms.badgeModal.submitState === AsyncStates.PENDING;

export const selectShowProfilePictureModal = (state: RootState) => state.modalForms.profilePictureModal.show;

export const selectProfilePictureSubmitting = (state: RootState) =>
  state.modalForms.profilePictureModal.submitState === AsyncStates.PENDING;

export const selectShowAchievementModal = (state: RootState) => state.modalForms.achievementModal.show;

export const selectAchievementSubmitting = (state: RootState) =>
  state.modalForms.achievementModal.submitState === AsyncStates.PENDING;

export const selectBadgeType = (state: RootState) => state.modalForms.badgeModal.type;

export const selectNonFungibleForm = (state: RootState) => state.modalForms.nonFungibleForm;

export const selectFungibleForm = (state: RootState) => state.modalForms.fungibleForm;

export const selectStatForm = (state: RootState) => state.modalForms.statForm;

export const selectInteractionForm = (state: RootState) => state.modalForms.interactionForm;

export const selectCurrencyForm = (state: RootState) => state.modalForms.currencyForm;

export default slice.reducer;

export const {
  openBadgeModal,
  closeBadgeModal,
  updateBadgeType,
  openProfilePictureModal,
  closeProfilePictureModal,
  openAchievementModal,
  closeAchievementModal,
  updateNonFungibleBlockchain,
  updateNonFungibleInterface,
  updateNonFungibleAddress,
  updateNonFungibleTokenId,
  updateFungibleBlockchain,
  updateFungibleAddress,
  updateFungibleKeyword,
  updateStatBlockchain,
  updateStatInterface,
  updateInteractionBlockchain,
  updateInteractionType,
  updateInteractionTransactionId,
  updateCurrencyBlockchain,
  submitFungibleSearch,
} = slice.actions;
