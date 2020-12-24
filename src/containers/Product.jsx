
import '../css/Product.css';
import { Star } from '@material-ui/icons';

const Product = ({title, price, rating, img}) => {
  return (
    <div className="product">
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
      <button>Añadir al carrito</button>
    </div>
  );
}

export default Product;
