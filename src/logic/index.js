import App from 'overmind';
import createConnect from 'overmind-react';
import * as actions from './actions';
import * as effects from './effects';
import state from './state';

const config = {
  onInitialize: actions.createInitialState,
  actions,
  state,
  effects,
};

const app = new App(config);

export const connect = createConnect(app);

export default app;
