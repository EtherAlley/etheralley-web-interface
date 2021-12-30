import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homeReducer from './containers/HomePage/slice';
import profileReducer from './containers/ProfilePage/slice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    profilePage: profileReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
