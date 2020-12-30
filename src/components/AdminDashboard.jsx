import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { db } from '../firebase';
import { useEffect } from 'react';
import { connect } from 'react-redux'; 
import { setProducts } from "../actions";
import '../css/AdminDashboard.css'

const ProductPreview = ({ product }) => {
  const history = useHistory();
  const {
    id,
    description,
    categories,
    stock,
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
      <td>{price}</td>
    </tr>
  )
}

const AdminDashboard = ({ products, setProducts }) => {
  const history = useHistory();
  const allProducts = [];
  const getProducts = () => {
    db.collection('products').get()
    .then(query => {
      query.forEach(doc => allProducts.push({ ...doc.data(), id: doc.id }));
      setProducts(allProducts);
    })
    .catch(error => {
      console.error(error)
    })
  }

  useEffect(() => {
    getProducts();
  }, []);


  return (
    <div>
      <button onClick={()=>history.push('/new')}>Nuevo Producto</button>
      <table>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Categorias</th>
            <th>Destacado</th>
            <th>Listado</th>
            <th>Imagenes</th>
            <th>Stock</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => <ProductPreview product={product} />)}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = state => ({
  products: state.products,
}) 

const mapDispatchToProps = dispatch => ({
  setProducts: products => dispatch(setProducts(products)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);