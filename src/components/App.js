import React from 'react';
import { Panels } from './Panels';
import { UsersPanel } from './UsersPanel';
import ExpensesPanel from './ExpensesPanel';
import { connect } from '../logic';

const App = () => (
  <Panels>
    <UsersPanel />
    <ExpensesPanel />
  </Panels>
);

export default connect(App);
