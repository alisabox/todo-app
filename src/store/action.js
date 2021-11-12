import { createAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const ActionType = {
  AddTask: 'AddTask',
  RemoveTask: 'RemoveTask',
  EditTask: 'EditTask',
  SetEditableTask: 'SetEditableTask',
}

export const addTaskAction = createAction(
  ActionType.AddTask,
  ({id, text, title}) => ({
    payload: {
      id: nanoid(),
      text,
      title,
      time: new Date().toLocaleString(),
      isDone: false,
    },
  }),
);

export const removeTaskAction = createAction(
  ActionType.RemoveTask,
  (id) => ({
    payload: {
      id,
    },
  }),
);

export const editTaskAction = createAction(
  ActionType.EditTask,
  (task) => ({
    payload: {
      task,
    },
  }),
);


export const setEditableTaskAction = createAction(
  ActionType.SetEditableTask,
  (task) => ({
    payload: {
      task,
    },
  }),
);