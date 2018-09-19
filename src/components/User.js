import React from 'react';
import Amount from './Amount';
import Button from './Button';
import { connect } from '../logic';

/**
 * Display an user with it's associated color
 * If a `onRemove` props is passed, a delete button appear on hover.
 */

const User = ({ app, user }) => {
  const removeUser = app.actions.removeUser;
  return (
    <div className="user">
      <div className="user--img" style={{ background: user.color }} />
      <p className="user--name">{user.name}</p>
      {user.sum !== undefined && <Amount value={user.sum} className={removeUser ? 'user--amount' : ''} />}
      {removeUser && (
        <Button
          flatStyle
          dangerStyle
          className="user--delete"
          onClick={() => {
            removeUser(user);
          }}
        >
          Delete
        </Button>
      )}
    </div>
  );
};

export default connect(User);
