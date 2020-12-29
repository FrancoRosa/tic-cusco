import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import '../css/Subtotal.css'
const Subtotal = ({value, items}) => {
  const history = useHistory();

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={value => (
          <>
            <p>
              Subtotal ({items} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" name="" id=""/> Esta orden contiene un regalo
            </small>
          </>
        )}
        decimalScale={2}
        fixedDecimalScale={true}
        value={value}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'S/.'}
      />
      {items > 0 ? <button onClick={()=>history.push('/payment')}>Proceder al pago</button> : null }
    </div>
  );
};

export default Subtotal;
