import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'; 
import '../css/AdminDashboard.css'

const ProductPreview = ({ product, fields }) => {
  const history = useHistory();
  const [hover, setHover] = useState(false);
  const {
    id,
    title,
    description,
    brand,
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
      {fields.title && <td>{title}</td>}
      {fields.description && <td>{description}</td>}
      {fields.brand && <td>{brand}</td>}
      {fields.categories && <td>{categories.join(', ')}</td>}
      {fields.highlight && <td>{highlight ? 'si': 'no'}</td>}
      {fields.list && <td>{list ? 'si': 'no'}</td>}
      {fields.urls && <td>{urls.length}</td>}
      {fields.stock && <td>{stock}</td>}
      {fields.listprice && <td>{listprice}</td>}
      {fields.price && <td>{price}</td>}
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
  const defFields = {
    title: true,
    description: false,
    brand: true,
    categories: true,
    stock: true,
    listprice: true,
    price: true,
    highlight: true,
    list: true,
    urls: true,
  }
  const [fields, setFields] = useState(localStorage.fields ? JSON.parse(localStorage.fields) : defFields)
  
  const toogleField = e => {
    const tag = e.target.id
    const tempFields = {...fields, [tag]: !fields[tag]}
    setFields(tempFields);
    localStorage.fields = JSON.stringify(tempFields)
  }

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
        <div className="dashboard__fields">
          <span className={`tag ${fields.title ? "is-dark" : "is-light"}`} id="title" onClick={toogleField}>Titulo</span>
          <span className={`tag ${fields.description ? "is-dark" : "is-light"}`} id="description" onClick={toogleField}>Descripcion</span>
          <span className={`tag ${fields.brand ? "is-dark" : "is-light"}`} id="brand" onClick={toogleField}>Marca</span>
          <span className={`tag ${fields.categories ? "is-dark" : "is-light"}`} id="categories" onClick={toogleField}>Categorias</span>
          <span className={`tag ${fields.stock ? "is-dark" : "is-light"}`} id="stock" onClick={toogleField}>Stock</span>
          <span className={`tag ${fields.listprice ? "is-dark" : "is-light"}`} id="listprice" onClick={toogleField}>PrecioLista</span>
          <span className={`tag ${fields.price ? "is-dark" : "is-light"}`} id="price" onClick={toogleField}>Precio</span>
          <span className={`tag ${fields.highlight ? "is-dark" : "is-light"}`} id="highlight" onClick={toogleField}>Destacado</span>
          <span className={`tag ${fields.list ? "is-dark" : "is-light"}`} id="list" onClick={toogleField}>Listado</span>
          <span className={`tag ${fields.urls ? "is-dark" : "is-light"}`} id="urls" onClick={toogleField}>Imagenes</span>
        </div>
        <table className="card table is-striped dashboard__table">
          <thead>
            <tr>
              {fields.title && <th>Titulo</th>}
              {fields.description && <th>Descripcion</th>}
              {fields.brand && <th>Marca</th>}
              {fields.categories && <th>Categorias</th>}
              {fields.highlight && <th>Destacado</th>}
              {fields.list && <th>Listado</th>}
              {fields.urls && <th>Imagenes</th>}
              {fields.stock && <th>Stock</th>}
              {fields.listprice && <th>PrecioLista</th>}
              {fields.price && <th>Precio</th>}
            </tr>
          </thead>
          <tbody>
            {categoryFilter(products, filter).map(product => <ProductPreview product={product} fields={fields} key={product.id}/>)}
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
