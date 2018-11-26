import {
  RECEIVE_BAR,
  REQUEST_BAR,
  BAR_API,
} from './constants';

const requestBar = () => ({ type: REQUEST_BAR });

const receiveBar = data => ({
  type: RECEIVE_BAR,
  payload: data,
});

const fetchBar = () => async (dispatch, getState, api) => {
  dispatch(requestBar());
  dispatch(receiveBar(await api.get(BAR_API)));
};

export default fetchBar;
