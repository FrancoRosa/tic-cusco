import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { db } from '../firebase';
import { useEffect } from 'react';
import { connect } from 'react-redux'; 
import { setProducts } from "../actions";

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

  const goToProduct = id => {
    console.log(id)
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <button onClick={()=>history.push('/new')}>Nuevo Producto</button>
      {products.map(product =>
        <div key={product.id} className="product" onClick={()=>goToProduct(product.id)}>
          <h1>{product.title}</h1>
          <p><strong>Precio:</strong>{product.price}</p>
          <p><strong>Stock</strong>{product.stock}</p>
        </div>  
      )}
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