import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { BigNumberish } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';

export interface State {
  loading: boolean;
  error: boolean;
  balance: string;
}

const initialState: State = {
  loading: true,
  error: false,
  balance: '',
};

export const loadProfile = createAsyncThunk<string, { library: any; address: string }, any>(
  'profile/load',
  async ({ library, address }) => {
    const balance: BigNumberish = await library.getBalance(address);
    return formatEther(balance);
  }
);

export const slice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProfile.pending, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(loadProfile.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(loadProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.balance = action.payload;
      });
  },
});

export const {} = slice.actions;

export const selectProfile = (state: RootState) => state.profile;

export default slice.reducer;
