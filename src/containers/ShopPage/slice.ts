import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BigNumber, Contract, utils } from 'ethers';
import EtherAlleyStoreAbi from '../../abi/EtherAlleyStore';
import { AsyncStates, StoreAssets, Toasts, ToastStatuses } from '../../common/constants';
import { fetchAPI, fetchAPINoResponse } from '../../common/http';
import Settings from '../../common/settings';
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
  getListingsState: AsyncStates.PENDING,
  getBalancesState: AsyncStates.PENDING,
  purchaseState: AsyncStates.READY,
  listings: [],
  balances: [],
};

export const getListings = createAsyncThunk<Listing[], undefined, { state: RootState }>(
  'shopPage/getListings',
  async () => {
    return fetchAPI<Listing[]>('/listings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token_ids: [StoreAssets.PREMIUM, StoreAssets.BETA_TESTER],
      }),
    });
  }
);

export const getBalances = createAsyncThunk<
  string[],
  { library: any; account: string | null | undefined },
  { state: RootState }
>('shopPage/getBalances', async ({ library, account }) => {
  if (!account) {
    return [];
  }

  const contract = new Contract(
    Settings.STORE_ADDRESS,
    new utils.Interface(EtherAlleyStoreAbi),
    library.getSigner(account).connectUnchecked()
  );

  const balances = await contract.balanceOfBatch([account, account], [StoreAssets.PREMIUM, StoreAssets.BETA_TESTER]);

  return balances.map((balance: BigNumber) => balance.toString());
});

export const purchase = createAsyncThunk<
  void,
  { library: any; account: string; tokenId: string; price: string; quantity: string },
  { state: RootState }
>('shopPage/purchase', async ({ library, account, tokenId, price, quantity }, { dispatch }) => {
  try {
    const contract = new Contract(
      Settings.STORE_ADDRESS,
      new utils.Interface(EtherAlleyStoreAbi),
      library.getSigner(account).connectUnchecked()
    );

    const tx = await contract.purchase(account, tokenId, quantity, [], { value: price, gasLimit: 1000000 });

    await tx.wait();

    await fetchAPINoResponse(`/profiles/${account}/refresh`);

    dispatch(showToast({ toast: Toasts.SUCCESS_SUBMITTING_PURCHASE, status: ToastStatuses.SUCCESS }));
  } catch (ex) {
    dispatch(showToast({ toast: Toasts.ERROR_SUBMITTING_PURCHASE, status: ToastStatuses.ERROR }));
    throw ex;
  }
});

export const slice = createSlice({
  name: 'shopPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListings.pending, (state, action) => {
      state.getListingsState = AsyncStates.PENDING;
    });
    builder.addCase(getListings.fulfilled, (state, action) => {
      state.getListingsState = AsyncStates.FULFILLED;
      state.listings = action.payload;
    });
    builder.addCase(getListings.rejected, (state, action) => {
      state.getBalancesState = AsyncStates.REJECTED;
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

export const selectLoadingBalances = (state: RootState) => state.shopPage.getBalancesState === AsyncStates.PENDING;

export const selectSubmittingPurchase = (state: RootState) => state.shopPage.purchaseState === AsyncStates.PENDING;

export const selectListings = (state: RootState) => state.shopPage.listings;

export const selectBalances = (state: RootState) => state.shopPage.balances;

export default slice.reducer;
