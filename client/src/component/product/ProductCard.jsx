import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Stack } from 'react-bootstrap';
import instance from '../../util/axios-setting';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const navigateToPurchase = () => {
    navigate(`/product/${product._id}`);
    console.log('card_product:', product._id);
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
    <Container fluid>
      <Row xs="auto" className="justify-content-md-center">
        <Col xs={12}>
          <div>
            <Card className="mb-2 ms-3 mr-5">
              <Card.Body>
                <Card.Link onClick={navigateToPurchase}>
                  <Card.Img variant="top" src={imgSrc} alt="상품사진" />
                </Card.Link>
                <Card.Text className="mb-2 mt-4 fw-bold">
                  {product?.title}
                </Card.Text>
                <Card.Subtitle className="mb-2 mt-2 text-muted">
                  {product?.shortDescription}
                </Card.Subtitle>
                <Card.Text className="mb-2 mt-4 fw-bold">
                  {product?.price}원
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductCard;
