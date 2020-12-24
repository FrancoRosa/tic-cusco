import '../css/Home.css';
import Product from './Product';

const Home = () => {
  return (
    <div className="home">
      <div className="home__container">
        <img src="/img/home1.png" alt="home" className="home__image" />
        <div className="home__row">
          <Product
            title="Woo! woffers 35W loud as fuck"
            price={49.90} rating={5} img="/img/prod3.png"
          />
          <Product
            title="Producto inutil, solo lo usarás una vez"
            price={49.90} rating={5} img="/img/prod1.png"
          />
        </div>
        <div className="home__row">
          <Product
            title="Woo! woffers 35W loud as fuck"
            price={49.90} rating={5} img="/img/prod2.png"
          />
          <Product
            title="Producto inutil, solo lo usarás una vez"
            price={49.90} rating={5} img="/img/prod3.png"
          />
          <Product
            title="Producto inutil, solo lo usarás una vez"
            price={49.90} rating={5} img="/img/prod1.png"
          />
        </div>
        <div className="home__row">
        </div>
      </div>
    </div>
  );
} 

export default Home;