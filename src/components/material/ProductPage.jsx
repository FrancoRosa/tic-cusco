import { connect } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";

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
    <div>
      <Carousel 
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        showStatus={false}
        transitionTime={500}
      >
        <div>
          <img className="carousel__img"
            src="img/banner1.png" alt=""
          />
        </div>
        <div>
          <img className="carousel__img"
            src="img/banner2.png" alt=""
          />
        </div>
        <div>
          <img className="carousel__img"
            src="img/banner3.png" alt=""
          />
        </div>
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
              <tr>
                <th>Imagenes ({product.urls.length}):</th>
                <td>{product.urls.map(img => <img src={img} alt="" className="product__img"/>)}</td>
              </tr>
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
