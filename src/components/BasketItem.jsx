import { connect } from 'react-redux';
import { removeFromBasket, addToBasket, deleteFromBasket } from '../actions';
import '../css/BasketItem.css'

const BasketItem = ({ product, addToBasket, removeFromBasket, deleteFromBasket }) => {
  const { id, title, price, img, count } = product;
  return (
    <div className="basketitem" id={id}>
      <div className="basketitem__img">
        <img src={img} alt=""/>
      </div>
      <div className="basketitem__info">
        <h2>{title}</h2>
        <p>s/. <strong>{price}</strong> </p>
      </div>
      <div className="basketitem__count">
        <button onClick={()=>removeFromBasket(product)}> - </button>
        <p>{count}</p>
        <button onClick={()=>addToBasket(product)}> + </button>
        <button onClick={()=>deleteFromBasket(product)}> Quitar </button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addToBasket: item => {dispatch(addToBasket(item))},
  removeFromBasket: item => {dispatch(removeFromBasket(item))},
  deleteFromBasket: item => {dispatch(deleteFromBasket(item))}
})

export default connect(null, mapDispatchToProps)(BasketItem);
