import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Toasts, ToastStatuses } from '../../common/constants';
import { RootState } from '../../store';

export interface State {
  toastId: string | undefined;
  toast: Toasts | undefined;
  status: ToastStatuses | undefined;
  connecting: boolean;
}

const initialState: State = {
  toastId: undefined,
  toast: undefined,
  status: undefined,
  connecting: false,
};

export const connectToWallet = createAsyncThunk<
  void,
  {
    isMobile: boolean;
    activateBrowserWallet: () => void;
  },
  { state: RootState }
>('app/connectToWallet', async ({ isMobile, activateBrowserWallet }, { dispatch }) => {
  if (isMobile) {
    dispatch(showToast({ toast: Toasts.MOBILE_WALLET_SUPPORT, status: ToastStatuses.INFO }));
    return;
  }

  try {
    await activateBrowserWallet(); // it is actually async...
  } catch (ex) {
    dispatch(showToast({ toast: Toasts.ERROR_CONNECTING_TO_WALLET, status: ToastStatuses.ERROR }));
  }
});

export const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<{ toast: Toasts; status: ToastStatuses }>) => {
      state.toastId = nanoid();
      state.toast = action.payload.toast;
      state.status = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectToWallet.pending, (state, _) => {
        state.connecting = true;
      })
      .addCase(connectToWallet.rejected, (state, _) => {
        state.connecting = false;
      })
      .addCase(connectToWallet.fulfilled, (state, _) => {
        state.connecting = false;
      });
  },
});

export const { showToast } = slice.actions;

export const selectApp = (state: RootState) => state.app;

export const selectIsConnecting = (state: RootState) => state.app.connecting;

export default slice.reducer;
