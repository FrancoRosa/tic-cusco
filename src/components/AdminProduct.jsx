import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const AdminProduct = ({ products }) => {
  const params = useParams();
  const history = useHistory();  
  const {
    description,
    categories,
    stock,
    price,
    highlight,
    list,
    urls 
  } = products.filter(product => product.id === params.id)[0];
  return (
    <div className="admin__product">
      <div>
        <p><strong>Descripcion: </strong>{description}</p>
        <p><strong>Categorias: </strong>{categories.join(', ')}</p>
        <p><strong>Destacado: </strong>{highlight ? 'si': 'no'}</p>
        <p><strong>Listado: </strong>{list ? 'si': 'no'}</p>
        <p><strong>Stock: </strong>{stock}</p>
        <p><strong>Precio: </strong>{price}</p>
        <br />
        <h5>Imagenes({urls.length})</h5>
        {
          urls.length > 0
          &&
          urls.map(img => <img src={img} />)
        }
      </div>
      <button onClick={()=>history.push('/dashboard')}>Regresar</button>  
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
})

export default connect(mapStateToProps)(AdminProduct);
