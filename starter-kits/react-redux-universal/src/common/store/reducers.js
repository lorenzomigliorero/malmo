import { combineReducers } from 'redux';

import foo from '@/state/foo/reducer';
import bar from '@/state/bar/reducer';

export default combineReducers({
  foo,
  bar,
});
