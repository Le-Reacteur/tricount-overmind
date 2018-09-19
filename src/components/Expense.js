import React from 'react';
import Amount from './Amount';
import Button from './Button';
import { connect } from '../logic';

/**
 * Represent an expense, rendering the description,
 * the amout and the user (with it's color) if provided.
 */

const Expense = ({ expense, app }) => {
  const hasUser = expense.user.name && expense.user.color;
  const removeExpense = app.actions.removeExpense;

  return (
    <div className="expense">
      <div className="expense--info">
        <p className="expense--description">{expense.description}</p>
        {hasUser && (
          <div className="expense--user">
            <div className="expense--user-color" style={{ background: expense.user.color }} />
            <p className="expense--user-text">{expense.user.name}</p>
          </div>
        )}
      </div>
      <Amount className={removeExpense ? 'expense--amount' : ''} value={expense.amount} />
      {removeExpense && (
        <Button
          flatStyle
          dangerStyle
          className="expense--delete"
          onClick={() => {
            removeExpense();
          }}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default connect(Expense);
