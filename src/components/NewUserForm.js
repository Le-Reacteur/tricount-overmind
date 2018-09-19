import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import Button from './Button';
import ButtonContainer from './ButtonContainer';
import { Input } from './Input';
import { extractDataFromSubmitEvent, clearFormFromSubmitEvent, Validator } from '../utils';
import { connect } from '../logic';

const NewUserFormRender = ({ app }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const data = extractDataFromSubmitEvent(e);
        // Validate data
        const validated = Validator.validate(
          Validator.schema({
            username: Validator.notEmptyStr('No name ?'),
          }),
          data
        );
        if (validated.error) {
          alert(validated.error);
          return;
        }
        app.actions.addUser(validated.value.username);
        clearFormFromSubmitEvent(e);
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
