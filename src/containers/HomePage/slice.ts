import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStates } from '../../common/constants';
import { fetchAPI } from '../../common/http';
import { Profile } from '../../common/types';
import { RootState } from '../../store';

export interface State {
  address: string;
  getTopProfilesState: AsyncStates;
  topProfiles: Profile[];
}

const initialState: State = {
  address: '',
  getTopProfilesState: AsyncStates.PENDING,
  topProfiles: [],
};

export const getTopProfiles = createAsyncThunk<Profile[], undefined, { state: RootState }>(
  'home/getTopProfiles',
  async () => {
    return fetchAPI<Profile[]>('/profiles/top');
  }
);

export const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTopProfiles.fulfilled, (state, action) => {
      state.getTopProfilesState = AsyncStates.FULFILLED;
      state.topProfiles = action.payload;
    });
    builder.addCase(getTopProfiles.rejected, (state, action) => {
      state.getTopProfilesState = AsyncStates.REJECTED;
    });
  },
});

export const { setAddress } = slice.actions;

export const selectHome = (state: RootState) => state.home;

export const selectLoadingTopProfiles = (state: RootState) => state.home.getTopProfilesState === AsyncStates.PENDING;

export const selectTopProfiles = (state: RootState) => state.home.topProfiles;

export default slice.reducer;
