import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'; 
import '../css/AdminDashboard.css'

const ProductPreview = ({ product }) => {
  const history = useHistory();
  const {
    id,
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
    <tr key={id} className="product__row" onClick={()=>history.push(`/dashboard/${id}`)}>
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
    <div>
      <button onClick={()=>history.push('/new')}>Nuevo Producto</button>
      <br />
      <div className="search">
        <h6>Filtrar: </h6>
        <input type="text" onChange={e => setFilter(e.target.value)} value={filter}/>
        <br />
        <p><strong>Total: </strong> {products.length} productos</p>
        <p><strong>Resultados: </strong> {categoryFilter(products,filter).length} productos</p>
      </div>
      <table>
        <thead>
          <tr>
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
  );
}

const mapStateToProps = state => ({
  products: state.products,
}) 

// const mapDispatchToProps = dispatch => ({
//   setProducts: products => dispatch(setProducts(products)),
// })

// export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
export default connect(mapStateToProps)(AdminDashboard);
