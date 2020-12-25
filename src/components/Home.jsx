import '../css/Home.css';
import Product from './Product';

const Home = ({ addToBasket }) => {
  return (
    <div className="home">
      <div className="home__container">
        <img src="/img/home1.png" alt="home" className="home__image" />
        <div className="home__row">
          <Product
            id="123"
            title="Woo! woffers 35W loud as fuck"
            price={9.90} rating={5} img="/img/prod3.png"
          />
          <Product
            id="122"
            title="Producto inutil, solo lo usarás una vez"
            price={0.90} rating={5} img="/img/prod1.png"
          />
        </div>
        <div className="home__row">
          <Product
            id="222"
            title="TV 99', LED FPGA, Ultra kill "
            price={4.90} rating={5} img="/img/prod2.png"
          />
          <Product
            id="522"
            title="Producto inutil, solo lo usarás una vez"
            price={49.90} rating={5} img="/img/prod3.png"
          />
          <Product
            id="125"
            title="Producto inutil, solo lo usarás una vez"
            price={49.90} rating={5} img="/img/prod1.png"
          />
        </div>
        <div className="home__row">
          <Product
            id="222"
            title="TV 99', LED FPGA, Ultra kill "
            price={49.90} rating={5} img="/img/prod2.png"
          />
        </div>
      </div>
    </div>
  );
} 

export default Home;
