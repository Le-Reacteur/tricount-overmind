import React from 'react';
import { Panel } from './Panel';
import Card from './Card';
import User from './User';
import { List } from './List';
import { CenteredText } from './CenteredText';
import { NewUserForm } from './NewUserForm';
import { connect } from '../logic';

const UsersPanelRender = ({ app }) => {
  const noUsers = app.state.usersWithSum.length === 0;
  return (
    <Panel>
      <Card title="Users">
        {noUsers ? (
          <CenteredText>Use the form below to create your first user</CenteredText>
        ) : (
          <List>
            {app.state.usersWithSum.map(user => (
              <User key={user.id} user={user} />
            ))}
          </List>
        )}
      </Card>
      <NewUserForm />
    </Panel>
  );
};

export const UsersPanel = connect(UsersPanelRender);
