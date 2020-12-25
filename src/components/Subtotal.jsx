import CurrencyFormat from 'react-currency-format';
import '../css/Subtotal.css'
const Subtotal = ({value, items}) => {
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
      <button>Proceder al pago</button>
    </div>
  );
};

export default Subtotal;
