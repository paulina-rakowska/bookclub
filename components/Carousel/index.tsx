"use client";

import Slider from "react-slick";
import { CarouselItem, CarouselProps } from "./types";
import Image from "next/image";

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
          {/* {carouselItems.map((carouselItem: CarouselItem) => 
            (<div key={carouselItem.id}>
              <div className="carouselImg">
                <Image
                  src={carouselItem.image}
                  alt={carouselItem.title}
                  className=""
                />               
                <h3>{carouselItem.title}</h3>
                <p>{carouselItem.author}</p>
              </div>
            </div>)
          )} */}
        </Slider>
      </div>
  );
};

export default Carousel;
