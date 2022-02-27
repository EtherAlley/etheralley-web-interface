import { ReactChild } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import useAppDispatch from '../../hooks/useAppDispatch';
import { onDragDrop } from './slice';

function DragDropProvider({ children }: { children: ReactChild }) {
  const dispatch = useAppDispatch();

  return <DragDropContext onDragEnd={(result) => dispatch(onDragDrop(result))}>{children}</DragDropContext>;
}

export default DragDropProvider;
