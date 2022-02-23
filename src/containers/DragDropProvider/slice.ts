import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropResult } from 'react-beautiful-dnd';
import { RootState } from '../../store';

export interface State {}

const initialState: State = {};

export const slice = createSlice({
  name: 'dragDrop',
  initialState,
  reducers: {
    onDragDrop: (_state, _action: PayloadAction<DropResult>) => {},
  },
});

export const { onDragDrop } = slice.actions;

export const selectDragDrop = (state: RootState) => state.dragDrop;

export default slice.reducer;
