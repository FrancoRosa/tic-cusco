import '../css/Payment.css';
import { connect } from 'react-redux';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';
import { db } from '../firebase';

const Payment = ({ basket, user }) => {
  const total = basket.reduce((sum, prod) => sum + prod.price*prod.count, 0)
  const placeOrder = () => {
    db.collection('users')
      .doc(user?.email)
      .collection('orders')
      .doc(user?.email)
      .set({
        basket: basket,
        amount: total,
        created: Date.now(),
      })
  }
  
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Pago (<Link to='/checkout'>{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>My Screet</p>
            <p>CUsco, Peru</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Revisar Productos</h3>
          </div>
          <div className="payment__items">
            {basket.map(item => <CheckoutProduct product={item} />)}
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Revisar metodo de Pago</h3>
          </div>
          <div className="payment__details">
            <button onClick={placeOrder}>Pagar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  basket: state.basket,
  user: state.user,
})

export default connect(mapStateToProps)(Payment);