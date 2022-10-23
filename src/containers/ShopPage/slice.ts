import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BigNumber } from 'ethers';
import { AsyncStates, Blockchains, Interfaces, StoreAssets, Toasts, ToastStatuses } from '../../common/constants';
import { Fetch, FetchProfilesAPI } from '../../common/http';
import Settings from '../../common/settings';
import { Listing, ListingInfo, NonFungibleMetadata } from '../../common/types';
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

export const getListings = createAsyncThunk<Listing[], { contract: any }, { state: RootState }>(
  'shopPage/getListings',
  async ({ contract }) => {
    try {
      const [listings, premium, beta] = await Promise.all([
        contract.getListingBatch([StoreAssets.PREMIUM, StoreAssets.BETA_TESTER]),
        Fetch<NonFungibleMetadata>(
          `/store/000000000000000000000000000000000000000000000000000000000000000${StoreAssets.PREMIUM}.json`,
          {
            method: 'GET',
          }
        ),
        Fetch<NonFungibleMetadata>(
          `/store/000000000000000000000000000000000000000000000000000000000000000${StoreAssets.BETA_TESTER}.json`,
          {
            method: 'GET',
          }
        ),
      ]);

      if (premium.error || !premium.data) {
        throw new Error('error fetching premium metadata');
      }

      if (beta.error || !beta.data) {
        throw new Error('error fetching balance metadata');
      }

      const listingInfo: ListingInfo[] = listings.map((listing: any) => {
        return {
          purchasable: listing[0],
          transferable: listing[1],
          price: listing[2].toString(),
          supply_limit: listing[3].toString(),
          balance_limit: listing[4].toString(),
        };
      });

      const premiumListing: Listing = {
        contract: {
          blockchain: Blockchains.POLYGON,
          address: Settings.STORE_ADDRESS,
          interface: Interfaces.ERC1155,
        },
        token_id: StoreAssets.PREMIUM,
        metadata: premium.data,
        info: listingInfo[0],
      };

      const betaListing: Listing = {
        contract: {
          blockchain: Blockchains.POLYGON,
          address: Settings.STORE_ADDRESS,
          interface: Interfaces.ERC1155,
        },
        token_id: StoreAssets.BETA_TESTER,
        metadata: beta.data,
        info: listingInfo[1],
      };

      return [premiumListing, betaListing];
    } catch (ex) {
      console.error(ex);
      throw ex;
    }
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
    await FetchProfilesAPI<void>(`/profiles/${address}/refresh`);
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
      state.getBalancesState = AsyncStates.REJECTED;
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

export const selectErrorLoadingBalances = (state: RootState) =>
  state.shopPage.getBalancesState === AsyncStates.REJECTED;

export const selectSubmittingPurchase = (state: RootState) => state.shopPage.purchaseState === AsyncStates.PENDING;

export const selectListings = (state: RootState) => state.shopPage.listings;

export const selectBalances = (state: RootState) => state.shopPage.balances;

export default slice.reducer;
