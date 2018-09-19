import * as mutations from './mutations';
import { uniqueId, getRandomColor } from '../utils';

export const addExpense = action => action().mutate(mutations.addExpense);
export const removeExpense = action => action().mutate(mutations.removeExpense);

export const removeUser = action =>
  action()
    .mutate(mutations.removeExpensesOfUser)
    .mutate(mutations.removeUser);

export const addUser = action =>
  action()
    .map((_, name) => {
      const color = getRandomColor();
      const userId = uniqueId('user');

      return {
        color,
        id: userId,
        name,
      };
    })
    .mutate(mutations.addUser);
