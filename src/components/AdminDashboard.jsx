import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
// import { db } from '../firebase';
// import { useEffect } from 'react';
import { connect } from 'react-redux'; 
// import { setProducts } from "../actions";
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
  
  const goToProduct = id => {
    history.push(`/dashboard/${id}`) 
  }

  return(
    <tr key={id} className="product__row" onClick={()=>goToProduct(id)}>
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

const AdminDashboard = ({ products }) => {
  const history = useHistory();
  const [filter, setFilter] = useState('');
  const [result, setResult] = useState([]);
  
  // const getProducts = () => {
  //   const allProducts = [];
  //   db.collection('products').get()
  //   .then(query => {
  //     query.forEach(doc => allProducts.push({ ...doc.data(), id: doc.id }));
  //     setProducts(allProducts);
  //     setResult(allProducts);
  //     setFilter('')
  //   })
  //   .catch(error => {
  //     console.error(error)
  //   })
  // }

  const handleFilter = text => {
    if (text.length<3) {
      setResult(products)
    } else {
      const filtered = products.filter(product => product.categories.reduce((r,w) => r || w.includes(text.toLowerCase()), false))
      setResult(filtered);
    }
  }

  // useEffect(() => {
  //   getProducts();
  // }, []);

  return (
    <div>
      <button onClick={()=>history.push('/new')}>Nuevo Producto</button>
      <br />
      <div className="search">
        <h6>Filtrar: </h6>
        <input type="text" onChange={e => { handleFilter(e.target.value); setFilter(e.target.value)}} value={filter}/> 
        <p>Productos ({result.length})</p> 
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
          {result.map(product => <ProductPreview product={product} key={product.id}/>)}
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
