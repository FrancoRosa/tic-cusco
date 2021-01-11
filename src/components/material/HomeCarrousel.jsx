import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const HomeCarrousel = () => {
  return(
    <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
      <div>
        <img src="img/home1.png" alt="" />
      </div>
      <div>
        <img src="img/home1.png" alt=""  />
      </div>
      <div>
        <img src="img/home1.png" alt=""  />
      </div>
    </Carousel>
  )
}

export default HomeCarrousel