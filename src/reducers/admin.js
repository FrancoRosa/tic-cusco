import { SET_ADMIN } from '../actions/index';

const admin = (state = false, action) => {
  switch (action.type) {
    case SET_ADMIN:
      return action.admin;
    default:
      return state;
  }
}

export default admin;