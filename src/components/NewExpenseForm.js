import React from 'react';
import Card from './Card';
import Button from './Button';
import Select from './Select';
import ButtonContainer from './ButtonContainer';
import Input from './Input';
import { connect } from '../logic';

const NewExpenseFormRender = ({ app }) => {
  if (app.state.users.length === 0) {
    return null;
  }

  return (
    <form
      onSubmit={event => {
        event.persist();
        const shouldClear = app.actions.submitAddExpense(event);
        if (shouldClear) {
          app.actions.clearForm(event.target);
        }
      }}
    >
      <Card title="New Expense">
        <Input name="description" placeholder="Description" />
        <Input name="amount" placeholder="Amount" />
        <Select
          name="userId"
          options={[
            { key: 'none', text: 'Select an user' },
            ...app.state.users.map(user => ({ key: user.id, text: user.name })),
          ]}
          label="User"
        />
      </Card>
      <ButtonContainer>
        <Button submit>Add Expense</Button>
      </ButtonContainer>
    </form>
  );
};

export const NewExpenseForm = connect(NewExpenseFormRender);
