import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncStates, StoreAssets } from '../../common/constants';
import { fetchAPI } from '../../common/http';
import { Listing } from '../../common/types';
import { RootState } from '../../store';

export interface State {
  getListingsState: AsyncStates;
  listings: Listing[];
}

const initialState: State = {
  getListingsState: AsyncStates.PENDING,
  listings: [],
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
export const slice = createSlice({
  name: 'shopPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListings.fulfilled, (state, action) => {
      state.getListingsState = AsyncStates.FULFILLED;
      state.listings = action.payload;
    });
    builder.addCase(getListings.rejected, (state, action) => {
      state.getListingsState = AsyncStates.REJECTED;
    });
  },
});

export const selectLoadingListings = (state: RootState) => state.shopPage.getListingsState === AsyncStates.PENDING;

export const selectListings = (state: RootState) => state.shopPage.listings;

export default slice.reducer;
