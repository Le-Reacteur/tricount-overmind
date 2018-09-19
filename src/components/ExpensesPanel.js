import React from 'react';
import { Panel } from './Panel';
import Card from './Card';
import Expense from './Expense';
import { List } from './List';
import { CenteredText } from './CenteredText';
import { NewExpenseForm } from './NewExpenseForm';
import { connect } from '../logic';

const ExpensesPanelRender = ({ app }) => {
  const noUsers = app.state.users.length === 0;
  const noExpenses = app.state.expensesWithUsers.length === 0;
  return (
    <Panel>
      <Card title="Expenses">
        {noUsers ? (
          <CenteredText>Create your first user to add expenses</CenteredText>
        ) : noExpenses ? (
          <CenteredText>You don't have any expenses, use the form below to add one</CenteredText>
        ) : (
          <List>
            {app.state.expensesWithUsers.map((expense, index) => (
              <Expense key={index} expense={expense} />
            ))}
          </List>
        )}
      </Card>
      <NewExpenseForm />
    </Panel>
  );
};

// ExpensesPanelRender.propTypes = {
//   expensesWithUsers: CustomPropTypes.expensesWithUser.isRequired,
//   users: CustomPropTypes.users.isRequired,
//   removeExpense: PropTypes.func.isRequired,
// };

export default connect(ExpensesPanelRender);
