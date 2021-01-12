import { connect } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import './css/ProductPage.css';
const ProductPage = ({ products }) => {
  const params = useParams();
  const history = useHistory();  
  const [product, setProduct] = useState({
    id: '',
    title: '',
    description: '',
    brand: '',
    categories: [],
    stock: 0,
    price: 0,
    urls: [],
  })
  
  const updateProduct = products => {
    if (products.length>0) {
      const product = products.filter(product => product.id === params.id)[0];
      const {
        id,
        title,
        description,
        brand,
        categories,
        stock,
        price,
        urls,
      } = product;
      setProduct({
        id,
        title,
        description,
        brand,
        categories,
        stock,
        price,
        urls,
      });
    }
  }

  useEffect(()=>{
    updateProduct(products)
  }, [products])

  return (
    <div className="product__page">
      <Carousel infiniteLoop autoPlay
        showStatus={false}
        transitionTime={1000}
        interval={8000}
      >
          {product.urls.map(url=> <div className="productpage__img"><img src={url} alt=""/></div>)}
      </Carousel>
      <div className="container">
        <div className="card product__card">
          <table className="table product__table">
            <tbody>
              <tr><th>Titulo:</th> <td>{product.title}</td></tr>
              <tr><th>Descripcion:</th> <td>{product.description}</td></tr>
              <tr><th>Marca:</th> <td>{product.brand}</td></tr>
              <tr><th>Categorias ({product.categories.length}):</th> <td>{product.categories.join(', ')}</td></tr>
              <tr><th>Stock:</th> <td>{product.stock}</td></tr>
              <tr><th>Precio:</th> <td>{product.price}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(ProductPage);
