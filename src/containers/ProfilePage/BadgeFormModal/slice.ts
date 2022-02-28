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
  show: boolean;
  submitState: AsyncStates;
  type: BadgeTypes | undefined;
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

const initialState: State = {
  show: false,
  submitState: AsyncStates.READY,
  type: undefined,
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
};

export const submitForm = createAsyncThunk<void, BadgeTypes | undefined, { state: RootState }>(
  'badgeForm/submitForm',
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
  'badgeForm/getNonFungibleToken',
  async (_, { getState, dispatch }) => {
    const {
      badgeForm: {
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
  'badgeForm/getFungibleToken',
  async (_, { getState, dispatch }) => {
    const {
      badgeForm: {
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
  'badgeForm/getStatistic',
  async (_, { getState, dispatch }) => {
    const {
      badgeForm: {
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

export const slice = createSlice({
  name: 'badgeForm',
  initialState,
  reducers: {
    openBadgeForm: (state) => {
      Object.assign(state, initialState);
      state.show = true;
    },
    closeBadgeForm: (state) => {
      Object.assign(state, initialState);
      state.show = false;
    },
    updateBadgeType: (state, action: PayloadAction<string>) => {
      Object.assign(state, initialState);
      state.show = true;
      state.type = action.payload as BadgeTypes;
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
      state.submitState = AsyncStates.PENDING;
    });
    builder.addCase(getNonFungibleToken.fulfilled, (state) => {
      Object.assign(state, initialState);
      state.show = false;
      state.submitState = AsyncStates.FULFILLED;
    });
    builder.addCase(getNonFungibleToken.rejected, (state) => {
      state.submitState = AsyncStates.REJECTED;
    });
    builder.addCase(getFungibleToken.pending, (state) => {
      state.submitState = AsyncStates.PENDING;
    });
    builder.addCase(getFungibleToken.fulfilled, (state) => {
      Object.assign(state, initialState);
      state.show = false;
      state.submitState = AsyncStates.FULFILLED;
    });
    builder.addCase(getFungibleToken.rejected, (state) => {
      state.submitState = AsyncStates.REJECTED;
    });
    builder.addCase(getStatistic.pending, (state) => {
      state.submitState = AsyncStates.PENDING;
    });
    builder.addCase(getStatistic.fulfilled, (state) => {
      Object.assign(state, initialState);
      state.show = false;
      state.submitState = AsyncStates.FULFILLED;
    });
    builder.addCase(getStatistic.rejected, (state) => {
      state.submitState = AsyncStates.REJECTED;
    });
  },
});

export const selectShow = (state: RootState) => state.badgeForm.show;

export const selectSubmitting = (state: RootState) => state.badgeForm.submitState === AsyncStates.PENDING;

export const selectType = (state: RootState) => state.badgeForm.type;

export const selectNonFungibleForm = (state: RootState) => state.badgeForm.nonFungibleForm;

export const selectFungibleForm = (state: RootState) => state.badgeForm.fungibleForm;

export const selectStatForm = (state: RootState) => state.badgeForm.statForm;

export default slice.reducer;

export const {
  openBadgeForm,
  closeBadgeForm,
  updateBadgeType,
  updateNonFungibleBlockchain,
  updateNonFungibleInterface,
  updateNonFungibleAddress,
  updateNonFungibleTokenId,
  updateFungibleBlockchain,
  updateFungibleAddress,
  updateStatBlockchain,
  updateStatInterface,
} = slice.actions;
