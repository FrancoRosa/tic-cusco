import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './css/HomeCarrousel.css';

const HomePromo = () => {
  return(
    <Carousel 
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      showStatus={false}
      showIndicators={true}
      transitionTime={1000}
      interval={4000}

    >
      <div>
        <img className="carousel__img"
          src="img/promo1.png" alt=""
        />
      </div>
      <div>
        <img className="carousel__img"
          src="img/promo2.png" alt=""
        />
      </div>
      <div>
        <img className="carousel__img"
          src="img/promo3.png" alt=""
        />
      </div>
      <div>
        <img className="carousel__img"
          src="img/promo4.png" alt=""
        />
      </div>
      <div>
        <img className="carousel__img"
          src="img/promo5.png" alt=""
        />
      </div>
    </Carousel>
  )
}

export default HomePromo
