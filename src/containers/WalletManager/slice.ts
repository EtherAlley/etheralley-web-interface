import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Toasts, ToastStatuses } from '../../common/constants';
import { RootState } from '../../store';
import { Connector } from 'wagmi';
import { Chain, ConnectArgs, ConnectResult, Provider, Signer } from '@wagmi/core';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { FetchProfilesAPI } from '../../common/http';
import { showToast } from '../App/slice';
import { Profile } from '../../common/types';

export interface State {
  isWalletModalOpen: boolean;
  isConnectingToWallet: boolean;
  isSwitchingNetwork: boolean;
  isDisconnectingFromWallet: boolean;
  isSigningMessage: boolean;
  isLoadingConnectedProfile: boolean;
  connectedProfile: Profile | undefined;
}

const initialState: State = {
  isWalletModalOpen: false,
  isConnectingToWallet: false,
  isSwitchingNetwork: false,
  isDisconnectingFromWallet: false,
  isSigningMessage: false,
  isLoadingConnectedProfile: false,
  connectedProfile: undefined,
};

export const connectToWallet = createAsyncThunk<
  void,
  {
    connectAsync: (args?: Partial<ConnectArgs> | undefined) => Promise<ConnectResult<Provider>>;
    connector: Connector;
  },
  { state: RootState }
>('wallet/connectToWallet', async ({ connectAsync, connector }, { dispatch }) => {
  try {
    await connectAsync({ connector });
    dispatch(showToast({ toast: Toasts.SUCCESS_CONNECTING_TO_WALLET, status: ToastStatuses.SUCCESS }));
  } catch (ex) {
    dispatch(showToast({ toast: Toasts.ERROR_CONNECTING_TO_WALLET, status: ToastStatuses.ERROR }));
    console.error(ex);
    throw ex;
  }
});

export const switchNetwork = createAsyncThunk<
  void,
  {
    switchNetworkAsync: (chainId_?: number | undefined) => Promise<Chain>;
    chainId: number;
  },
  { state: RootState }
>('wallet/switchNetwork', async ({ switchNetworkAsync, chainId }, { dispatch }) => {
  try {
    await switchNetworkAsync(chainId);
    dispatch(showToast({ toast: Toasts.SUCCESS_SWITCHING_NETWORK, status: ToastStatuses.SUCCESS }));
  } catch (ex) {
    dispatch(showToast({ toast: Toasts.ERROR_SWITCHING_NETWORK, status: ToastStatuses.ERROR }));
    console.error(ex);
    throw ex;
  }
});

export const disconnectFromWallet = createAsyncThunk<
  void,
  {
    disconnectAsync: UseMutateAsyncFunction<void, Error, void, unknown>;
  },
  { state: RootState }
>('wallet/disconnectFromWallet', async ({ disconnectAsync }, { dispatch }) => {
  try {
    await disconnectAsync();
    dispatch(showToast({ toast: Toasts.SUCCESS_DISCONNECTING_FROM_WALLET, status: ToastStatuses.SUCCESS }));
  } catch (ex) {
    dispatch(showToast({ toast: Toasts.ERROR_DISCONNECTING_FROM_WALLET, status: ToastStatuses.ERROR }));
    console.error(ex);
    throw ex;
  }
});

/**
 * Prompt the user to sign a message that is provided by the profiles api.
 * if a signed message is already in localStorage and it has not expired, use that instead.
 * if noCache is true, we will ignore any values in local storage
 */
export const signMessage = createAsyncThunk<
  string,
  { address: string; signer: Signer; noCache?: boolean },
  { state: RootState }
>('wallet/signMessage', async ({ address, signer, noCache }) => {
  const storageSignature = window.localStorage.getItem(`etheralley_signature_${address}`);
  const storageSignatureExpirey = window.localStorage.getItem(`etheralley_signature_expirey_${address}`);
  const now = Date.now() / 1000;

  if (!noCache && storageSignature && storageSignatureExpirey && Number.parseInt(storageSignatureExpirey) > now) {
    return storageSignature;
  }

  const { data, error } = await FetchProfilesAPI<{ message: string; expires: number }>(`/challenges/${address}`);

  if (error || !data) {
    throw new Error('error getting challenge message');
  }

  const signature = await signer.signMessage(data.message);

  window.localStorage.setItem(`etheralley_signature_${address}`, signature);
  window.localStorage.setItem(`etheralley_signature_expirey_${address}`, data.expires.toString());

  return signature;
});

export const loadConnectedProfile = createAsyncThunk<Profile, { address: string }, { state: RootState }>(
  'wallet/loadConnectedProfile',
  async ({ address }) => {
    const { error, data } = await FetchProfilesAPI<Profile>(`/profiles/${address}?hydration=light`);

    if (error || !data) {
      throw new Error('error fetching top profiles');
    }

    return data;
  }
);

export const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    openWalletModal: (state) => {
      state.isWalletModalOpen = true;
    },
    closeWalletModal: (state) => {
      state.isWalletModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectToWallet.pending, (state) => {
        state.isConnectingToWallet = true;
        state.isWalletModalOpen = false;
      })
      .addCase(connectToWallet.rejected, (state) => {
        state.isConnectingToWallet = false;
      })
      .addCase(connectToWallet.fulfilled, (state) => {
        state.isConnectingToWallet = false;
      })
      .addCase(switchNetwork.pending, (state) => {
        state.isSwitchingNetwork = true;
      })
      .addCase(switchNetwork.rejected, (state) => {
        state.isSwitchingNetwork = false;
      })
      .addCase(switchNetwork.fulfilled, (state) => {
        state.isSwitchingNetwork = false;
      })
      .addCase(disconnectFromWallet.pending, (state) => {
        state.isDisconnectingFromWallet = true;
      })
      .addCase(disconnectFromWallet.rejected, (state) => {
        state.isDisconnectingFromWallet = false;
      })
      .addCase(disconnectFromWallet.fulfilled, (state) => {
        state.isDisconnectingFromWallet = false;
      })
      .addCase(signMessage.pending, (state) => {
        state.isSigningMessage = true;
      })
      .addCase(signMessage.rejected, (state) => {
        state.isSigningMessage = false;
      })
      .addCase(signMessage.fulfilled, (state) => {
        state.isSigningMessage = false;
      })
      .addCase(loadConnectedProfile.pending, (state) => {
        state.isLoadingConnectedProfile = true;
        state.connectedProfile = undefined;
      })
      .addCase(loadConnectedProfile.rejected, (state) => {
        state.isLoadingConnectedProfile = false;
        state.connectedProfile = undefined;
      })
      .addCase(loadConnectedProfile.fulfilled, (state, action) => {
        state.isLoadingConnectedProfile = false;
        state.connectedProfile = action.payload;
      });
  },
});

export const { openWalletModal, closeWalletModal } = slice.actions;

export const selectWallet = (state: RootState) => state.wallet;

export default slice.reducer;
