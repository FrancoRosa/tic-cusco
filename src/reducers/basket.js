import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from '../actions/index';

const addCount = (state, item) => {
  const result = state.filter(product => product.id === item.id)[0]
  if (result) return result.count + 1
  return 1
}

const removeCount = (state, item) => {
  const result = state.filter(product => product.id === item.id)[0]
  if (result.count > 0) return result.count - 1
  return 0
}

const basket = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      return [
        ...state.filter(product => product.id !== action.item.id),
        { ...action.item, count: addCount(state, action.item)}
      ];
    case REMOVE_FROM_BASKET:
      return [
        ...state.filter(product => product.id !== action.item.id),
        { ...action.item, count: removeCount(state, action.item)}
      ];
    default:
      return state;
  }
};

export default basket;