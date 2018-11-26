import { RECEIVE_BAR } from './constants';

const initialState = {};

export default (state = initialState, action) => {
  if (typeof action === 'undefined') return state;

  /* eslint-disable indent */
  switch (action.type) {
    case RECEIVE_BAR: {
      return action.payload.data;
    }

    default:
      return state;
  }
  /* eslint-enable indent */
};
