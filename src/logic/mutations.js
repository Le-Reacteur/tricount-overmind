export const addExpense = (state, expense) => {
  state.expenses.push(expense);
};

export const removeExpense = (state, expense) => {
  const expenseIndex = state.expenses.indexOf(expense);
  state.expenses.splice(expenseIndex, 1);
};

export const removeExpensesOfUser = (state, user) => {
  state.expenses = state.expenses.filter(expense => expense.userId !== user.id);
};

export const addUser = (state, user) => {
  state.users.push(user);
};

export const removeUser = (state, user) => {
  const userIndex = state.users.indexOf(user);
  state.users.splice(userIndex, 1);
};
