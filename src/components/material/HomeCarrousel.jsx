import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './css/HomeCarrousel.css';

const HomeCarrousel = () => {
  
  return(
    <Carousel 
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      showStatus={false}
      transitionTime={1000}
      interval={4000}

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
  )
}

export default HomeCarrousel