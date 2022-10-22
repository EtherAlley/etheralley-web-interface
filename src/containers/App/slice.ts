import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Toasts, ToastStatuses } from '../../common/constants';
import { RootState } from '../../store';
import { Connector } from 'wagmi';

export interface State {
  toastId: string | undefined;
  toast: Toasts | undefined;
  status: ToastStatuses | undefined;
  isWalletModalOpen: boolean;
  isConnectingToWallet: boolean;
  isSwitchingNetwork: boolean;
}

const initialState: State = {
  toastId: undefined,
  toast: undefined,
  status: undefined,
  isWalletModalOpen: false,
  isConnectingToWallet: false,
  isSwitchingNetwork: false,
};

export const connectToWallet = createAsyncThunk<
  void,
  {
    connectAsync: Function;
    connector: Connector;
  },
  { state: RootState }
>('app/connectToWallet', async ({ connectAsync, connector }, { dispatch }) => {
  try {
    await connectAsync({ connector });
  } catch (ex) {
    dispatch(showToast({ toast: Toasts.ERROR_CONNECTING_TO_WALLET, status: ToastStatuses.ERROR }));
  }
});

export const switchNetwork = createAsyncThunk<
  void,
  {
    switchNetworkAsync: Function;
    chainId: number;
  },
  { state: RootState }
>('app/switchNetwork', async ({ switchNetworkAsync, chainId }, { dispatch }) => {
  try {
    await switchNetworkAsync(chainId);
  } catch (ex) {
    dispatch(showToast({ toast: Toasts.ERROR_SWITCHING_NETWORK, status: ToastStatuses.ERROR }));
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
    openWalletModal: (state) => {
      state.isWalletModalOpen = true;
    },
    closeWalletModal: (state) => {
      state.isWalletModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectToWallet.pending, (state, _) => {
        state.isConnectingToWallet = true;
        state.isWalletModalOpen = false;
      })
      .addCase(connectToWallet.rejected, (state, _) => {
        state.isConnectingToWallet = false;
      })
      .addCase(connectToWallet.fulfilled, (state, _) => {
        state.isConnectingToWallet = false;
      })
      .addCase(switchNetwork.pending, (state, _) => {
        state.isSwitchingNetwork = true;
      })
      .addCase(switchNetwork.rejected, (state, _) => {
        state.isSwitchingNetwork = false;
      })
      .addCase(switchNetwork.fulfilled, (state, _) => {
        state.isSwitchingNetwork = false;
      });
  },
});

export const { showToast, openWalletModal, closeWalletModal } = slice.actions;

export const selectApp = (state: RootState) => state.app;

export const selectIsConnectingToWallet = (state: RootState) => state.app.isConnectingToWallet;

export const selectIsWalletModalOpen = (state: RootState) => state.app.isWalletModalOpen;

export default slice.reducer;
