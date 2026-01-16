"use client";

import Slider from "react-slick";
import { CarouselItem, CarouselProps } from "./types";

const Carousel = ({ carouselItems }: CarouselProps) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
      <div>
        <h2>Newest Books</h2>
        <Slider {...settings}>
          {carouselItems.map((carouselItem: CarouselItem) => 
            (<div key={carouselItem.id}>
              <div className="carouselImg">
                <img src={carouselItem.image} alt={carouselItem.alt}/>
                <h3>{carouselItem.title}</h3>
                <p>{carouselItem.author}</p>
              </div>
            </div>)
          )}
        </Slider>
      </div>
  );
};

export default Carousel;
