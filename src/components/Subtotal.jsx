import CurrencyFormat from 'react-currency-format';
import '../css/Subtotal.css'
const Subtotal = () => {
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={value => (
          <>
            <p>
              Subtotal (0 items): <strong>0</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" name="" id=""/> Esta orden contiene un regalo
            </small>
          </>
        )}
        decimalScale={2}
        value={1}
        displayType="text"
        thousandSeparator={true}
        prefix="S/."
      />
      <button>Proceder al pago</button>
    </div>
  );
};

export default Subtotal;
