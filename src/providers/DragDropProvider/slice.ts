import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import { RootState } from '../../store';

const initialState = {};

export const slice = createSlice({
  name: 'dragDrop',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onDragDrop: (_state, _action: PayloadAction<DropResult>) => {
      return;
    },
  },
});

export const { onDragDrop } = slice.actions;

export const selectDragDrop = (state: RootState) => state.dragDrop;

export default slice.reducer;
