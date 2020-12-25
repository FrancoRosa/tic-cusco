export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET';

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
