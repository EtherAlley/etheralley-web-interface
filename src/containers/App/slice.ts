import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Toasts, ToastStatuses } from '../../common/constants';
import { RootState } from '../../store';

export interface State {
  toastId: string | undefined;
  toast: Toasts | undefined;
  status: ToastStatuses | undefined;
}

const initialState: State = {
  toastId: undefined,
  toast: undefined,
  status: undefined,
};

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
});

export const { showToast } = slice.actions;

export const selectApp = (state: RootState) => state.app;

export default slice.reducer;
