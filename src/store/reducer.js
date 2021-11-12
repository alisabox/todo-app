import { createReducer } from '@reduxjs/toolkit';
import { addTaskAction, removeTaskAction, editTaskAction, setEditableTaskAction } from './action';

export const initialState = {
  tasks: [],
  editableTask: undefined,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTaskAction, (state, action) => {
      state.tasks.push(action.payload);
    })
    .addCase(removeTaskAction, (state, action) => {
      const index = state.tasks.indexOf((task) => task.id === action.payload.id);
      state.tasks.splice(index);
    })
    .addCase(editTaskAction, (state, action) => {
      const index = state.tasks.indexOf(state.tasks.find((task) => task.id === action.payload.task.id));
      state.tasks.splice(index, 1, action.payload.task);
    })
    .addCase(setEditableTaskAction, (state, action) => {
      state.editableTask = action.payload.task;
    });
});
