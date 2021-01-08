import { SET_FILTER } from '../actions/index';

const user = (state = '', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export default user;