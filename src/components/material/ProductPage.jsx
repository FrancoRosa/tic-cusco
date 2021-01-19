import { connect } from "react-redux"
import { useHistory, useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { addToBasket } from '../../actions';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import StorefrontIcon from '@material-ui/icons/Storefront';
import './css/ProductPage.css';
import Typography from '@material-ui/core/Typography';

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
        className="productpage__imgs"
      >
        {product.urls.map(url=> 
          <div >
            <img
              className="productpage__img"
              src={url} alt=""/>
          </div>
        )}
      </Carousel>
      <div className="">
        <Typography variant="h4" component="h1" className="productpage__title">
          {product.title}
        </Typography>
        <Typography style={{color: 'green'}}> 
          {product.brand}
        </Typography>
        <Typography
          style={{
            position: 'relative',
            top: '-1.5rem',
            textAlign: 'right',
          }}  
        >
          ({product.stock} unidades) en Stock
        </Typography>
        <Typography variant="h5" component="h2"
          style={{
            color: 'red'
          }}
        >
          S/. {isNaN(product.price) ? '' : `${parseFloat(product.price).toFixed(2)}`}
        </Typography>
        <br />
        <Typography dangerouslySetInnerHTML={{__html: product.description}} >
        </Typography>
        <br />
        <Typography>
        <strong>Categorias:</strong> {product.categories.join(', ')}
        </Typography>
        <hr />
        
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
  );
};

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = dispatch => ({
  addToBasket: item => dispatch(addToBasket(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
