import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';
import { AsyncStates, StoreAssets, Toasts, ToastStatuses } from '../../common/constants';
import { FetchCoreAPI } from '../../common/http';
import { Listing } from '../../common/types';
import { RootState } from '../../store';
import { showToast } from '../App/slice';

export interface State {
  getListingsState: AsyncStates;
  getBalancesState: AsyncStates;
  purchaseState: AsyncStates;
  listings: Listing[];
  balances: string[];
}

const initialState: State = {
  getListingsState: AsyncStates.READY,
  getBalancesState: AsyncStates.READY,
  purchaseState: AsyncStates.READY,
  listings: [],
  balances: [],
};

export const getListings = createAsyncThunk<Listing[], undefined, { state: RootState }>(
  'shopPage/getListings',
  async () => {
    const { data, error } = await FetchCoreAPI<Listing[]>('/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token_ids: [StoreAssets.PREMIUM, StoreAssets.BETA_TESTER],
      }),
    });

    if (error || !data) {
      throw new Error('error fetching listings');
    }

    return data;
  }
);

export const getBalances = createAsyncThunk<
  string[],
  { contract: any; address: string | null | undefined },
  { state: RootState }
>('shopPage/getBalances', async ({ contract, address }) => {
  if (!address) {
    return [];
  }

  try {
    const balances = await contract.balanceOfBatch([address, address], [StoreAssets.PREMIUM, StoreAssets.BETA_TESTER]);

    return balances.map((balance: BigNumber) => balance.toString());
  } catch (ex) {
    // TODO: What should we do here?
    throw ex;
  }
});

export const purchase = createAsyncThunk<
  void,
  { contract: any; address: string; tokenId: string; price: string; quantity: string },
  { state: RootState }
>('shopPage/purchase', async ({ contract, address, tokenId, price, quantity }, { dispatch }) => {
  try {
    const tx = await contract.purchase(address, tokenId, quantity, [], { value: price, gasLimit: 1000000 });

    await tx.wait();

    dispatch(showToast({ toast: Toasts.SUCCESS_SUBMITTING_PURCHASE, status: ToastStatuses.SUCCESS }));
  } catch (ex) {
    dispatch(showToast({ toast: Toasts.ERROR_SUBMITTING_PURCHASE, status: ToastStatuses.ERROR }));
    throw ex;
  }

  try {
    dispatch(getBalances({ contract, address }));
  } catch {}

  try {
    await FetchCoreAPI<void>(`/profiles/${address}/refresh`);
  } catch {}
});

export const slice = createSlice({
  name: 'shopPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListings.pending, (state, action) => {
      state.getListingsState = AsyncStates.PENDING;
      state.listings = [];
    });
    builder.addCase(getListings.fulfilled, (state, action) => {
      state.getListingsState = AsyncStates.FULFILLED;
      state.listings = action.payload;
    });
    builder.addCase(getListings.rejected, (state, action) => {
      state.getListingsState = AsyncStates.REJECTED;
    });
    builder.addCase(getBalances.pending, (state, action) => {
      state.getBalancesState = AsyncStates.PENDING;
      state.balances = [];
    });
    builder.addCase(getBalances.fulfilled, (state, action) => {
      state.getBalancesState = AsyncStates.FULFILLED;
      state.balances = action.payload;
    });
    builder.addCase(getBalances.rejected, (state, action) => {
      state.getListingsState = AsyncStates.REJECTED;
    });
    builder.addCase(purchase.pending, (state, action) => {
      state.purchaseState = AsyncStates.PENDING;
    });
    builder.addCase(purchase.fulfilled, (state, action) => {
      state.purchaseState = AsyncStates.FULFILLED;
    });
    builder.addCase(purchase.rejected, (state, action) => {
      state.purchaseState = AsyncStates.REJECTED;
    });
  },
});

export const selectLoadingListings = (state: RootState) => state.shopPage.getListingsState === AsyncStates.PENDING;

export const selectFulfilledListings = (state: RootState) => state.shopPage.getListingsState === AsyncStates.FULFILLED;

export const selectErrorLoadingListings = (state: RootState) =>
  state.shopPage.getListingsState === AsyncStates.REJECTED;

export const selectLoadingBalances = (state: RootState) => state.shopPage.getBalancesState === AsyncStates.PENDING;

export const selectSubmittingPurchase = (state: RootState) => state.shopPage.purchaseState === AsyncStates.PENDING;

export const selectListings = (state: RootState) => state.shopPage.listings;

export const selectBalances = (state: RootState) => state.shopPage.balances;

export default slice.reducer;
