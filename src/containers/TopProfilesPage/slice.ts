import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncStates } from '../../common/constants';
import { fetchAPI } from '../../common/http';
import { Profile } from '../../common/types';
import { RootState } from '../../store';

export interface State {
  getTopProfilesState: AsyncStates;
  profiles: Profile[];
}

const initialState: State = {
  getTopProfilesState: AsyncStates.PENDING,
  profiles: [],
};

export const getTopProfiles = createAsyncThunk<Profile[], undefined, { state: RootState }>(
  'home/getTopProfiles',
  async () => {
    return fetchAPI<Profile[]>('/profiles/top');
  }
);

export const slice = createSlice({
  name: 'topProfiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopProfiles.fulfilled, (state, action) => {
      state.getTopProfilesState = AsyncStates.FULFILLED;
      state.profiles = action.payload;
    });
    builder.addCase(getTopProfiles.rejected, (state, action) => {
      state.getTopProfilesState = AsyncStates.REJECTED;
    });
  },
});

export const selectLoadingTopProfiles = (state: RootState) =>
  state.topProfilesPage.getTopProfilesState === AsyncStates.PENDING;

export const selectProfiles = (state: RootState) => state.topProfilesPage.profiles;

export default slice.reducer;
