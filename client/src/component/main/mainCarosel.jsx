import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import instance from '../../util/axios-setting';

function MainCard({ product }) {
  const navigate = useNavigate();
  const navigateToPurchase = () => {
    navigate(`/product/${product._id}`);
  };

  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    instance
      .get(`/api/products/img/${product.imageKey}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        responseType: 'blob',
      })
      .then((res) => {
        const getfile = new File([res.data], '');
        const reader = new FileReader();
        reader.onload = (event) => {
          const previewImage = String(event.target?.result);
          setImgSrc(previewImage);
        };
        reader.readAsDataURL(getfile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="mb-3 m-1">
        <img
          src={imgSrc}
          width="100%"
          height="200"
          alt="Lights"
          onDoubleClick={navigateToPurchase}
        />
      </div>
      <div>
        <h6>{product?.title}</h6>
        <p className="text-muted">{product?.shortDescription}</p>
        <p>{product?.price}원</p>
      </div>
    </div>
  );
}

export default MainCard;
