import { SET_PRODUCTS } from '../actions/index';

const user = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

export default user;