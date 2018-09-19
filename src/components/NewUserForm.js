import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Button from './Button';
import ButtonContainer from './ButtonContainer';
import Input from './Input';
import { connect } from '../logic';

const NewUserFormRender = ({ app }) => {
  return (
    <form
      onSubmit={event => {
        event.persist();
        const shouldClear = app.actions.submitAddUser(event);
        if (shouldClear) {
          app.actions.clearForm(event.target);
        }
      }}
    >
      <Card title="New User">
        <Input name="username" placeholder="User name" />
      </Card>
      <ButtonContainer>
        <Button submit>Add User</Button>
      </ButtonContainer>
    </form>
  );
};

NewUserFormRender.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export const NewUserForm = connect(NewUserFormRender);
