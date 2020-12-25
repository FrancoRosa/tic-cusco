import { connect } from 'react-redux';
import '../css/Product.css';
import { Star } from '@material-ui/icons';
import { addToBasket } from '../actions';

const Product = ({id, title, price, rating, img, addToBasket}) => {
  const item = {
    id,
    title,
    price,
    img,
    rating
  };

  return (
    <div id={id} className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>s/.</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating).fill().map((_, i) => <Star />)}
        </div>
      </div>
      <img src={img} alt="" />
      <button onClick={() => addToBasket(item)}>Añadir al carrito</button>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  addToBasket: item => {
    dispatch(addToBasket(item));
  },
});

export default connect(null, mapDispatchToProps)(Product);