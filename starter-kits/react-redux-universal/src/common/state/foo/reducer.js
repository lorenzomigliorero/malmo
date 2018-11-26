import { RECEIVE_FOO } from './constants';

const initialState = {};

export default (state = initialState, action) => {
  if (typeof action === 'undefined') return state;

  /* eslint-disable indent */
  switch (action.type) {
    case RECEIVE_FOO: {
      return action.payload.data;
    }

    default:
      return state;
  }
  /* eslint-enable indent */
};
