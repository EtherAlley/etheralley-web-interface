import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { BadgeTypes, FungibleToken, NonFungibleToken, Statistic } from '../../../common/types';
import {
  Blockchains,
  Interfaces,
  AsyncStates,
  StatisticTypes,
  Toasts,
  ToastStatuses,
  ZeroAddress,
} from '../../../common/constants';
import { fetchAPI } from '../../../common/http';
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
    type: BadgeTypes | undefined;
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
  };
  statForm: {
    blockchain: Blockchains | undefined;
    interface: Interfaces | undefined;
    type: StatisticTypes | undefined;
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
    type: undefined,
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
  },
  statForm: {
    blockchain: undefined,
    interface: undefined,
    type: undefined,
  },
});

export const submitBadge = createAsyncThunk<void, BadgeTypes | undefined, { state: RootState }>(
  'forms/submitBadge',
  async (type, { dispatch }) => {
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
      const nft = await fetchAPI<NonFungibleToken>(
        `/contracts/nft?blockchain=${blockchain}&interface=${interfaceName}&contract=${address}&token_id=${token_id}&user_address=${profile.address}`
      );
      return nft;
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
      const token = await fetchAPI<FungibleToken>(
        `/contracts/token?blockchain=${blockchain}&interface=${Interfaces.ERC20}&contract=${address}&user_address=${profile.address}`
      );
      return token;
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
      const stat = await fetchAPI<Statistic>(
        `/contracts/statistic?blockchain=${blockchain}&interface=${interfaceName}&type=${type}&user_address=${profile.address}&contract=${ZeroAddress}`
      );
      return stat;
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
      const nft = await fetchAPI<NonFungibleToken>(
        `/contracts/nft?blockchain=${blockchain}&interface=${interfaceName}&contract=${address}&token_id=${token_id}&user_address=${profile.address}`
      );
      return nft;
    } catch (ex) {
      dispatch(showToast({ toast: Toasts.ADDING_PROFILE_PICTURE, status: ToastStatuses.ERROR }));
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
    closeBadgeModal: () => {
      const state = initialState();
      state.badgeModal.show = false;
      return state;
    },
    updateBadgeType: (_, action: PayloadAction<string>) => {
      const state = initialState();
      state.badgeModal.show = true;
      state.badgeModal.type = action.payload as BadgeTypes;
      return state;
    },
    openProfilePictureModal: () => {
      const state = initialState();
      state.profilePictureModal.show = true;
      return state;
    },
    closeProfilePictureModal: () => {
      const state = initialState();
      state.profilePictureModal.show = false;
      return state;
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
    },
    updateStatBlockchain: (state, action: PayloadAction<string>) => {
      state.statForm.blockchain = action.payload as Blockchains;
    },
    updateStatInterface: (state, action: PayloadAction<string>) => {
      state.statForm.interface = action.payload as Interfaces;
      switch (action.payload) {
        case Interfaces.SUSHISWAP_EXCHANGE:
        case Interfaces.UNISWAP_V2_EXCHANGE:
        case Interfaces.UNISWAP_V3_EXCHANGE:
          state.statForm.type = StatisticTypes.SWAP;
          break;
      }
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
  },
});

export const selectShowBadgeModal = (state: RootState) => state.modalForms.badgeModal.show;

export const selectBadgeSubmitting = (state: RootState) =>
  state.modalForms.badgeModal.submitState === AsyncStates.PENDING;

export const selectShowProfilePictureModal = (state: RootState) => state.modalForms.profilePictureModal.show;

export const selectProfilePictureSubmitting = (state: RootState) =>
  state.modalForms.profilePictureModal.submitState === AsyncStates.PENDING;

export const selectBadgeType = (state: RootState) => state.modalForms.badgeModal.type;

export const selectNonFungibleForm = (state: RootState) => state.modalForms.nonFungibleForm;

export const selectFungibleForm = (state: RootState) => state.modalForms.fungibleForm;

export const selectStatForm = (state: RootState) => state.modalForms.statForm;

export default slice.reducer;

export const {
  openBadgeModal,
  closeBadgeModal,
  updateBadgeType,
  openProfilePictureModal,
  closeProfilePictureModal,
  updateNonFungibleBlockchain,
  updateNonFungibleInterface,
  updateNonFungibleAddress,
  updateNonFungibleTokenId,
  updateFungibleBlockchain,
  updateFungibleAddress,
  updateStatBlockchain,
  updateStatInterface,
} = slice.actions;
