import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { BadgeTypes, NonFungibleToken } from '../../../common/types';
import { Blockchains, Interfaces, AsyncStates } from '../../../common/constants';
import { fetchAPI } from '../../../common/http';

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
  },
};

export const getNonFungibleToken = createAsyncThunk<NonFungibleToken, undefined, { state: RootState }>(
  'badgeForm/getNonFungibleToken',
  async (_, { getState }) => {
    const {
      badgeForm: {
        nonFungibleForm: { blockchain, interface: interfaceName, address, token_id },
      },
      profilePage: { profile },
    } = getState();

    return await fetchAPI<NonFungibleToken>(
      `/contracts/nft?blockchain=${blockchain}&interface=${interfaceName}&contract=${address}&token_id=${token_id}&user_address=${profile.address}`
    );
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
