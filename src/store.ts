import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from './containers/App/slice';
import themeReducer from './providers/ThemeProvider/slice';
import dragDropReducer from './providers/DragDropProvider/slice';
import homeReducer from './containers/HomePage/slice';
import profileReducer from './containers/ProfilePage/slice';
import modalFormsReducer from './containers/ProfilePage/ModalForms/slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    home: homeReducer,
    profilePage: profileReducer,
    theme: themeReducer,
    dragDrop: dragDropReducer,
    modalForms: modalFormsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
