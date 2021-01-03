import { connect } from 'react-redux';
import '../css/Product.css';
import { addToBasket } from '../actions';

const Product = ({product, addToBasket}) => {
  const { id, description, price, urls, stock } = product

  return (
    <div id={id} className="product">
      <div className="product__info">
        <p>{description}</p>
        <p className="product__price">
          <small>s/.</small>
          <strong>{price}</strong>
        </p>
        <p><strong>Stock: </strong>{stock}</p>
      </div>
      <img src={urls[0]} alt="" />
      <button onClick={() => addToBasket(product)}>Añadir al carrito</button>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  addToBasket: item => {
    dispatch(addToBasket(item));
  },
});

export default connect(null, mapDispatchToProps)(Product);