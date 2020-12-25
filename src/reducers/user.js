import { SET_USER } from '../actions/index';

const user = (state = null, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}

export default user;