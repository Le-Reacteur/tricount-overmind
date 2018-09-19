import * as mutations from './mutations';
import * as operations from './operations';

export const addExpense = action => action().mutate(mutations.addExpense);

export const submitAddExpense = action =>
  action()
    .do(operations.doPreventDefault)
    .map((effects, event) => {
      return effects.extractDataFromSubmitEvent(event.target);
    })
    .map(({ Validator }, data) => {
      return Validator.validate(
        Validator.schema({
          userId: Validator.notEqualWrapper(Validator.notEmptyStr('Missing UserId'), 'none', 'Please select a User !'),
          description: Validator.notEmptyStr('You must provide a description'),
          amount: Validator.numberFromString('Amount must be a valid number'),
        }),
        data
      );
    })
    .when(operations.validatedIsValid, {
      true: a =>
        a()
          .map((_, v) => v.value)
          .compose(addExpense)
          .map(() => true),
      false: a =>
        a()
          .do((effects, value) => {
            effects.alertErrors(value.error);
          })
          .map(() => false),
    });

export const clearForm = a =>
  a().do((effects, event) => {
    effects.clearFormFromSubmitEvent(event);
  });

export const removeExpense = action => action().mutate(mutations.removeExpense);

export const removeUser = action =>
  action()
    .mutate(mutations.removeExpensesOfUser)
    .mutate(mutations.removeUser);

export const addUser = action =>
  action()
    .map((effects, name) => {
      const color = effects.getRandomColor();
      const userId = effects.uniqueId('user');

      return {
        color,
        id: userId,
        name,
      };
    })
    .mutate(mutations.addUser);

export const submitAddUser = action =>
  action()
    .do(operations.doPreventDefault)
    .map((effects, event) => {
      return effects.extractDataFromSubmitEvent(event.target);
    })
    .map(({ Validator }, data) => {
      return Validator.validate(
        Validator.schema({
          username: Validator.notEmptyStr('No name ?'),
        }),
        data
      );
    })
    .when(operations.validatedIsValid, {
      true: a =>
        a()
          .map((_, v) => v.value.username)
          .compose(addUser)
          .map(() => true),
      false: a =>
        a()
          .do((effects, value) => {
            effects.alertErrors(value.error);
          })
          .map(() => false),
    });

export const createInitialState = action =>
  action()
    .map(effects => {
      const initialUsers = [
        {
          id: effects.uniqueId('user'),
          name: 'Etienne',
          color: effects.getRandomColor(),
        },
        {
          id: effects.uniqueId('user'),
          name: 'Farid',
          color: effects.getRandomColor(),
        },
        {
          id: effects.uniqueId('user'),
          name: 'Superman',
          color: effects.getRandomColor(),
        },
      ];

      const initialExpenses = [
        {
          amount: effects.randomAmount(),
          description: 'First Expense',
          userId: effects.randomUserId(initialUsers),
        },
        {
          amount: effects.randomAmount(),
          description: 'Second Expense',
          userId: effects.randomUserId(initialUsers),
        },
        {
          amount: effects.randomAmount(),
          description: 'Third Expense',
          userId: effects.randomUserId(initialUsers),
        },
        {
          amount: effects.randomAmount(),
          description: 'Fourth Expense',
          userId: effects.randomUserId(initialUsers),
        },
        {
          amount: effects.randomAmount(),
          description: 'Fifth Expense',
          userId: effects.randomUserId(initialUsers),
        },
      ];
      return { initialUsers, initialExpenses };
    })
    .mutate((state, { initialUsers, initialExpenses }) => {
      state.expenses = initialExpenses;
      state.users = initialUsers;
    });
