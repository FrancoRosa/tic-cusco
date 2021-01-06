import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'; 
import '../css/AdminDashboard.css'

const ProductPreview = ({ product }) => {
  const history = useHistory();
  const [hover, setHover] = useState(false);
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
  } = product;
  
  return(
    <tr 
      key={id}
      className={hover && "dashboard__select"}
      onClick={()=>history.push(`/dashboard/${id}`)}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
    >
      <td>{title}</td>
      <td>{description}</td>
      <td>{categories.join(', ')}</td>
      <td>{highlight ? 'si': 'no'}</td>
      <td>{list ? 'si': 'no'}</td>
      <td>{urls.length}</td>
      <td>{stock}</td>
      <td>{listprice}</td>
      <td>{price}</td>
    </tr>
  )
}

const categoryFilter = (products, text) => {
  if (text.length <= 1) {
    return products;
  } else {
    const filtered = products.filter(product => product.categories.reduce((r,w) => r || w.includes(text.toLowerCase()), false))
    return filtered;
  }
}

const AdminDashboard = ({ products }) => {
  const history = useHistory();
  const [filter, setFilter] = useState('');

  return (
    <div className="dashboard">
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
          <div className="navbar-start dashboard__search">
            <h6 className="label">Buscar: </h6>
            <input className="input" type="text" 
              onChange={e => setFilter(e.target.value)}
              value={filter}
            />
          </div>
          <div className="navbar-end">
            <button className="button is-link" onClick={()=>history.push('/new')}>Nuevo</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card dashboard__stats">
          <p><strong>Total: </strong> {products.length} productos</p>
          <p><strong>Resultados: </strong> {categoryFilter(products,filter).length} productos</p>
        </div>
        <div className="card dashboard__fields">
          <button classNamegit >Titulo</button>
        </div>
        <table className="card table is-striped dashboard__table">
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Descripcion</th>
              <th>Categorias</th>
              <th>Destacado</th>
              <th>Listado</th>
              <th>Imagenes</th>
              <th>Stock</th>
              <th>PrecioLista</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {categoryFilter(products, filter).map(product => <ProductPreview product={product} key={product.id}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
}) 

export default connect(mapStateToProps)(AdminDashboard);
