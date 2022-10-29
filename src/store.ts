import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from './containers/App/slice';
import themeReducer from './providers/ThemeProvider/slice';
import dragDropReducer from './providers/DragDropProvider/slice';
import homeReducer from './containers/HomePage/slice';
import profileReducer from './containers/ProfilePage/slice';
import trendingReducer from './containers/TrendingPage/slice';
import shopReducer from './containers/ShopPage/slice';
import modalFormsReducer from './containers/ProfilePage/ModalForms/slice';
import walletReducer from './containers/WalletManager/slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    wallet: walletReducer,
    home: homeReducer,
    profilePage: profileReducer,
    trendingPage: trendingReducer,
    shopPage: shopReducer,
    theme: themeReducer,
    dragDrop: dragDropReducer,
    modalForms: modalFormsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
