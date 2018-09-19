import { derive } from 'overmind';
import { uniqueId, getRandomColor } from '../utils';

const initialUsers = [
  {
    id: uniqueId('user'),
    name: 'Etienne',
    color: getRandomColor(),
  },
  {
    id: uniqueId('user'),
    name: 'Farid',
    color: getRandomColor(),
  },
  {
    id: uniqueId('user'),
    name: 'Superman',
    color: getRandomColor(),
  },
];

const randomUserId = () => initialUsers[Math.floor(initialUsers.length * Math.random())].id;
const randomAmount = () => Math.floor(Math.random() * 10000) / 100;

const initialExpenses = [
  {
    amount: randomAmount(),
    description: 'First Expense',
    userId: randomUserId(),
  },
  {
    amount: randomAmount(),
    description: 'Second Expense',
    userId: randomUserId(),
  },
  {
    amount: randomAmount(),
    description: 'Third Expense',
    userId: randomUserId(),
  },
  {
    amount: randomAmount(),
    description: 'Fourth Expense',
    userId: randomUserId(),
  },
  {
    amount: randomAmount(),
    description: 'Fifth Expense',
    userId: randomUserId(),
  },
];

const state = {
  expenses: initialExpenses,
  users: initialUsers,
  expensesWithUsers: derive(state => {
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
  }),
  usersWithSum: derive(state => {
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
  }),
};

export default state;
