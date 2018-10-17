const state = {
  expenses: [],
  users: [],
  expensesWithUsers: state => {
    const users = state.users;
    return state.expenses.map(expense => {
      const user = users.find(user => {
        return expense.userId === user.id;
      });
      return {
        ...expense,
        user,
      };
    });
  },
  usersWithSum: state => {
    const users = state.users;
    const expenses = state.expenses;
    const usersWithSum = users.map(user => {
      const sum = expenses
        .filter(expense => expense.userId === user.id)
        .reduce((acc, expense) => acc + expense.amount, 0);
      return {
        ...user,
        sum,
      };
    });
    return usersWithSum;
  },
};

export default state;
