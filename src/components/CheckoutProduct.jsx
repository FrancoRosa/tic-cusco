import '../css/CheckoutProduct.css';

const CheckoutProduct = ({ product }) => {
  const {img, title, price, count} = product;
  return (
    <div className="checkoutproduct">
      <h3>{title}</h3>
      <img src={img} alt="" srcset=""/>
      <p>{price}</p>
      <p>{count}</p>
    </div>
  )
}

export default CheckoutProduct;