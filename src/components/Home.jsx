import { connect } from 'react-redux';
import Product from './Product';
import '../css/Home.css';

const groups = [[0,1],[2],[3,4]];
const minProducts = groups.reduce((sum, group) => group.length + sum, 0);

const HomeProducts = ({ products }) => {
  return (
    <div>
      {groups.map(group =>
        <div className='home__row'>
          {group.map(product =>
            <Product product={products[product]}/>
          )}
        </div>
      )}
    </div>
  )
}

const Home = ({ products }) => {
  return (
    <div className="home">
      <div className="home__container">
        <img src="/img/home1.png" alt="home" className="home__image" />
          {
            products.length > minProducts
            && 
            <HomeProducts products={products} />
          }
      </div>
    </div>
  );
} 

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps)(Home);