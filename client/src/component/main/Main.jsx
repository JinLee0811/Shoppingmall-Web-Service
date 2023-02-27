import React, { useState, useEffect } from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

import instance from '../../util/axios-setting';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MainCard from './mainCarosel';

import main1 from './mainImage/main1.jpg';
import main2 from './mainImage/main2.jpg';
import main3 from './mainImage/main3.jpg';

import './Main.css';
function Main() {
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [products3, setProducts3] = useState([]);

  useEffect(() => {
    instance.get(`/api/products`).then((res) => {
      setProducts(res.data.slice(0, 8));
      setProducts2(res.data.slice(10, 20));
      const recent = JSON.parse(localStorage.getItem('recent'));

      const array = res.data.filter((product) => {
        if (recent.find((a) => a.id === product._id)) {
          return true;
        } else {
          return false;
        }
      });
      console.log(array);
      setProducts3(array);
    });
  }, []);

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '30px',
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function (index) {},
  };
  const settings2 = {
    className: 'center',
    infinite: true,
    centerPadding: '30px',
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index) {},
  };
  const settings3 = {
    infinite: true,
    swipeToSlide: true,
  };
  return (
    <>
      <div className="container">
        <MDBCarousel showIndicators showControls fade>
          <MDBCarouselItem
            className="w-100 d-block mb-5"
            height={500}
            itemId={1}
            src={main1}
            alt="..."
          ></MDBCarouselItem>

          <MDBCarouselItem
            className="w-100 d-block mb-5"
            height={500}
            itemId={2}
            src={main2}
            alt="..."
          ></MDBCarouselItem>

          <MDBCarouselItem
            className="w-100 d-block mb-5"
            height={500}
            itemId={3}
            src={main3}
            alt="..."
          ></MDBCarouselItem>
        </MDBCarousel>
      </div>
      <div className="container mb-5">
        <div>
          <h4>신상</h4>
          <Slider {...settings}>
            {products.map((product) => {
              return <MainCard product={product} />;
            })}
          </Slider>
        </div>
      </div>
      <div className="container mb-4">
        <div>
          <h4>추천 상품</h4>
          <Slider {...settings2}>
            {products2.map((product) => {
              return <MainCard product={product} />;
            })}
          </Slider>
        </div>
      </div>
      <div className="container mb-4">
        <div style={{ width: '300px' }}>
          <h4>최근 본 상품</h4>
          <Slider {...settings3}>
            {products3.map((product) => {
              return <MainCard product={product} />;
            })}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default Main;
