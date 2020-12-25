export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';
export const DELETE_FROM_BASKET = 'DELETE_FROM_BASKET';
export const SET_USER = 'SET_USER';

export const addToBasket = item => (
  {
    item,
    type: ADD_TO_BASKET,
  }
);

export const removeFromBasket = item => (
  {
    item,
    type: REMOVE_FROM_BASKET,
  }
);

export const deleteFromBasket = item => (
  {
    item,
    type: DELETE_FROM_BASKET,
  }
);

export const setUser = user => (
  {
    user,
    type: SET_USER,
  }
);
