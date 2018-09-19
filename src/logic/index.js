import App from 'overmind-react';
import * as actions from './actions';
import state from './state';

const config = {
  actions,
  state,
};

const app = new App(config, {
  devtools: 'localhost:4005',
});

export const connect = app.connect;

export default app;
