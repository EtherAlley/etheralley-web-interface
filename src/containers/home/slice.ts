import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface State {
  address: string;
}

const initialState: State = {
  address: '',
};

export const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

export const { setAddress } = slice.actions;

export const selectHome = (state: RootState) => state.home;

export default slice.reducer;
