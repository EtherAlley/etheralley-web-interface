import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface State {}

const initialState: State = {};

export const slice = createSlice({
  name: 'shopPage',
  initialState,
  reducers: {},
});

export const selectShopPage = (state: RootState) => state.shopPage;

export default slice.reducer;
