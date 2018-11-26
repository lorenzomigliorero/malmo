import {
  RECEIVE_FOO,
  REQUEST_FOO,
  FOO_API,
} from './constants';

const requestFoo = () => ({ type: REQUEST_FOO });

const receiveFoo = data => ({
  type: RECEIVE_FOO,
  payload: data,
});

const fetchFoo = () => async (dispatch, getState, api) => {
  dispatch(requestFoo());
  dispatch(receiveFoo(await api.get(FOO_API)));
};

export default fetchFoo;
