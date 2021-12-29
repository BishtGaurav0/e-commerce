import React from "react";
import './CarouselComp.css'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import carouselImg1 from "../../Assests/CarouselImages/1.jpg";
import carouselImg2 from "../../Assests/CarouselImages/2.png";
import carouselImg3 from "../../Assests/CarouselImages/3.webp";
import carouselImg4 from "../../Assests/CarouselImages/4.jpg";
import carouselImg5 from "../../Assests/CarouselImages/5.webp";
import { useHistory } from "react-router-dom";

const CarouselComp = () => {
  const history = useHistory();
  return (
    <div className="carousel" onClick={ () => history.push('/dashboard')} >
      <Carousel infiniteLoop autoPlay showThumbs={false}>
        <div>
          <div>
            <img src={carouselImg1} alt="1"/>
          </div>
        </div>

        <div>
          <div>
            <img src={carouselImg2} alt="2" />
          </div>
        </div>

        <div>
          <div>
            <img src={carouselImg3} alt="3" />
          </div>
        </div>

        <div>
          <div>
            <img src={carouselImg4} alt="4" />
          </div>
        </div>

        <div>
          <div>
            <img src={carouselImg5} alt="5" />
          </div>
        </div>
        
      </Carousel>
    </div>
  );
};

export default CarouselComp;
