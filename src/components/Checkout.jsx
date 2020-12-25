import { connect } from 'react-redux';
import '../css/Checkout.css';
import BasketItem from './BasketItem';
import Subtotal from './Subtotal';

const Checkout = ({ basket }) => {
  const order = basket.sort((a, b) => (a.id > b.id) ? 1 : -1);
  const items = basket.reduce((sum, prod) => sum + prod.count, 0)
  const total = basket.reduce((sum, prod) => sum + prod.price*prod.count, 0)
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src="/img/promo.png" alt="" />
        <h2 className="checkout__title">Tu carrito de compras</h2>
        {order.map(product => <BasketItem product={product} />)}
      </div>
      <div className="checkout__rigth">
        <Subtotal value={total} items={items}/>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  basket: state.basket,
});

export default connect(mapStateToProps)(Checkout)
