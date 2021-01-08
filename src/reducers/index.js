import { combineReducers, createStore } from 'redux';
import basket from './basket';
import user from './user';
import admin from './admin';
import products from './products';
import filter from './filter';

const rootReducer = combineReducers({
  admin,
  basket,
  user,
  products,
  filter,
});

const store = createStore(
  rootReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;