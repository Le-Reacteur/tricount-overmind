import React from 'react';
import Card from './Card';
import Button from './Button';
import { Select } from './Select';
import ButtonContainer from './ButtonContainer';
import { Input } from './Input';
import { extractDataFromSubmitEvent, clearFormFromSubmitEvent, Validator } from '../utils';
import { connect } from '../logic';

const NewExpenseFormRender = ({ app }) => {
  if (app.state.users.length === 0) {
    return null;
  }

  const addExpense = app.actions.addExpense;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const data = extractDataFromSubmitEvent(e);
        // Validate data
        const validated = Validator.validate(
          Validator.schema({
            userId: Validator.notEqualWrapper(
              Validator.notEmptyStr('Missing UserId'),
              'none',
              'Please select a User !'
            ),
            description: Validator.notEmptyStr('You must provide a description'),
            amount: Validator.numberFromString('Amount must be a valid number'),
          }),
          data
        );
        if (validated.error) {
          alert(validated.error);
          return;
        }
        addExpense({
          userId: validated.value.userId,
          amount: validated.value.amount,
          description: validated.value.description,
        });
        clearFormFromSubmitEvent(e);
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

// NewExpenseFormRender.propTypes = {
//   users: CustomPropTypes.users.isRequired,
//   addExpense: PropTypes.func.isRequired,
// };

export const NewExpenseForm = connect(NewExpenseFormRender);
