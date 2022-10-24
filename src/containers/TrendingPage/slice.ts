import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncStates } from '../../common/constants';
import { FetchProfilesAPI } from '../../common/http';
import { Profile } from '../../common/types';
import { RootState } from '../../store';

export interface State {
  getProfilesState: AsyncStates;
  trendingProfiles: Profile[];
  spotlightProfile: Profile | undefined;
}

const initialState: State = {
  getProfilesState: AsyncStates.PENDING,
  trendingProfiles: [],
  spotlightProfile: undefined,
};

export const getProfiles = createAsyncThunk<[Profile[], Profile], undefined, { state: RootState }>(
  'home/getProfiles',
  async () => {
    const [trending, spotlight] = await Promise.all([
      FetchProfilesAPI<Profile[]>('/profiles/top'),
      FetchProfilesAPI<Profile>('/profiles/spotlight'),
    ]);

    if (trending.error || !trending.data) {
      throw new Error('error fetching top profiles');
    }

    if (spotlight.error || !spotlight.data) {
      throw new Error('error fetching spotlight profile');
    }

    return [trending.data, spotlight.data];
  }
);

export const slice = createSlice({
  name: 'trendingPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfiles.pending, (state, _) => {
      state.getProfilesState = AsyncStates.PENDING;
      state.trendingProfiles = [];
      state.spotlightProfile = undefined;
    });
    builder.addCase(getProfiles.fulfilled, (state, action) => {
      const [trendingProfiles, spotlightProfile] = action.payload;
      state.getProfilesState = AsyncStates.FULFILLED;
      state.trendingProfiles = trendingProfiles;
      state.spotlightProfile = spotlightProfile;
    });
    builder.addCase(getProfiles.rejected, (state, _) => {
      state.getProfilesState = AsyncStates.REJECTED;
    });
  },
});

export const selectLoadingTopProfiles = (state: RootState) =>
  state.trendingPage.getProfilesState === AsyncStates.PENDING;

export const selectFulfilledTopProfiles = (state: RootState) =>
  state.trendingPage.getProfilesState === AsyncStates.FULFILLED;

export const selectErrorLoadingTopProfiles = (state: RootState) =>
  state.trendingPage.getProfilesState === AsyncStates.REJECTED;

export const selectTrendingProfiles = (state: RootState) => state.trendingPage.trendingProfiles;

export const selectSpotlightProfile = (state: RootState) => state.trendingPage.spotlightProfile;

export default slice.reducer;
