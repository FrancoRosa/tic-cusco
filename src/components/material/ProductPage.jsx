import { connect } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import './css/ProductPage.css';
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { addToBasket } from '../../actions';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';

const ProductPage = ({ products, addToBasket }) => {
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
      <div className="">
        <div className="">
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
          <div className="productpage__actions">
            <Button
              startIcon={<AddIcon />}
              style={{textTransform: 'none'}}
              variant="outlined" color="black"
              onClick={() => addToBasket(product)}
            >
              Añadir al carrito
            </Button>
            <Button
              startIcon={<StorefrontIcon />}
              style={{textTransform: 'none'}}
              variant="outlined" color="black"
              onClick={() => history.push('/')}
            >
              Regresar al catalogo
            </Button>
            <Button
              startIcon={<ShoppingCart />}
              style={{textTransform: 'none'}}
              variant="outlined" color="black"
              onClick={() => history.push('/checkout')}
            >
              Ver carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  addToBasket: item => dispatch(addToBasket(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);