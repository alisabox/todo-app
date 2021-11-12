import { createSelector } from '@reduxjs/toolkit'

export const getTasks = (state) => state.tasks;
export const getEditableTask = (state) => state.editableTask;
export const getDoneTasks = createSelector(getTasks, (tasks) => tasks.filter(task => task?.isDone));
