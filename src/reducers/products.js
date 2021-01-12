import { SET_PRODUCTS } from '../actions/index';
const initialState = [
  {
    id: 1,
    title: "...",
    categories: [],
    description: " ",
    brand:" ",
    price: '',
    stock: 0,
    highlight: true,
    listprice: 0,
    list: true,
    urls:['/img/placeholder.png']
  },
  {
    id: 2,
    title: "...",
    categories: [],
    description: " ",
    brand:" ",
    price: '',
    stock: 0,
    highlight: true,
    listprice: 0,
    list: true,
    urls:['/img/placeholder.png']
  },
  {
    id: 3,
    title: "...",
    description: " ",
    categories: [],
    brand:" ",
    price: '',
    stock: 0,
    highlight: true,
    listprice: 0,
    list: true,
    urls:['/img/placeholder.png']
  },
  {
    id: 4,
    title: "...",
    description: " ",
    categories: [],
    brand:" ",
    price: '',
    stock: 0,
    highlight: true,
    listprice: 0,
    list: true,
    urls:['/img/placeholder.png']
  }
]

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

export default user;