import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import '../css/AdminProduct.css';

const AdminProduct = ({ products }) => {
  const params = useParams();
  const history = useHistory();  
  const {
    id,
    title,
    description,
    categories,
    stock,
    listprice,
    price,
    highlight,
    list,
    urls 
  } = products.filter(product => product.id === params.id)[0];
  return (
    <div>
      <div className="navbar dashboard__nav">
        <div className="navbar-brand">
          <h1
            className="title is-3 dashboard__title"
            onClick={() => history.push('/')}
          >
            tic-cusco
          </h1>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start new__title">
            <h1 className="title is-6">Detalles de producto</h1>
          </div>
          <div className="navbar-end">
            <button className="button is-success new__button" onClick={()=>history.push(`/edit/${id}`)}>Editar</button>  
            <button className="button is-link new__button" onClick={()=>history.push('/dashboard')}>Regresar</button>  
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="card product__card">
          <table className="table product__table">
            <tbody>
              <tr><th>Titulo:</th> <td>{title}</td></tr>
              <tr><th>Descripcion:</th> <td>{description}</td></tr>
              <tr><th>Categorias ({categories.length}):</th> <td>{categories.join(', ')}</td></tr>
              <tr><th>Destacado:</th> <td>{highlight ? 'si': 'no'}</td></tr>
              <tr><th>Listado:</th> <td>{list ? 'si': 'no'}</td></tr>
              <tr><th>Stock:</th> <td>{stock}</td></tr>
              <tr><th>Precio de Lista:</th> <td>{listprice}</td></tr>
              <tr><th>Precio:</th> <td>{price}</td></tr>
              <tr>
                <th>Imagenes ({urls.length}):</th>
                <td>{urls.map(img => <img src={img} alt="" className="product__img"/>)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
})

export default connect(mapStateToProps)(AdminProduct);
