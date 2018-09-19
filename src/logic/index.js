import App from 'overmind-react';
import * as actions from './actions';
import * as effects from './effects';
import state from './state';

const config = {
  onInitialize: actions.createInitialState,
  actions,
  state,
  effects,
};

const app = new App(config, {
  devtools: 'localhost:4005',
});

export const connect = app.connect;

export default app;
