import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homeReducer from './containers/home/slice';
import profileReducer from './containers/profile/slice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    profile: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
