import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Stack,
} from 'react-bootstrap';
import axios from 'axios';
import instance from '../../util/axios-setting';
import './Product.css';

function Product() {
  const [categoryId, setCategoryId] = useState('');
  const [productId, setProductId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [detailDescription, setDetailDescription] = useState('');
  const [inventory, setInventory] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [imageKey, setImageKey] = useState('');
  const { id } = useParams();

  const [imgSrc, setImgSrc] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let recent = localStorage.getItem('recent');
    console.log(recent === null);
    if (recent === null) {
      localStorage.setItem('recent', JSON.stringify([{ id }]));
    } else if (recent.length === 0) {
      localStorage.setItem('recent', JSON.stringify([{ id }]));
    } else {
      let array = JSON.parse(recent);
      const exist = array.find((item) => item.id === id);
      if (!exist) {
        array.unshift({ id });
      } else {
        array = array.filter((item) => item.id !== id);
        array.unshift({ id });
      }
      localStorage.setItem('recent', JSON.stringify(array));
    }

    instance
      .get(`/api/products/${id}`)
      .then((res) => {
        setProductId(res.data._id);
        setCategoryId(res.data.categoryId);
        setTitle(res.data.title);
        setPrice(res.data.price);
        setShortDescription(res.data.shortDescription);
        setDetailDescription(res.data.detailDescription);
        setInventory(res.data.inventory);
        setCategoryId(res.data.imageKey);
        instance
          .get(`/api/products/img/${res.data.imageKey}`, {
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
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container fluid>
      <div>
        <h1 className="title">상품상세</h1>
      </div>
      <Stack className="all" direction="horizontal" gap={2}>
        <Row xs={1} md={2}>
          <Col sm={8}>
            <Card className="img_bg">
              <Card.Img
                className="img_product"
                variant="top"
                src={imgSrc}
                alt="랜덤사진"
              />
            </Card>
          </Col>
          <Col sm={4}>
            <Card className="detail">
              <Card.Body>
                <Card.Title className="mb-2 mt-5 text-large">
                  <h1>{title}</h1>
                </Card.Title>
                <Badge bg="warning" text="dark">
                  추천
                </Badge>
                <Card.Subtitle className="mb-2 mt-2 text-muted">
                  {shortDescription}
                </Card.Subtitle>
                <Card.Text className="mb-2 mt-5">{detailDescription}</Card.Text>
                <Card.Text>{price}</Card.Text>
              </Card.Body>
            </Card>

            <Button
              className="m-3"
              variant="outline-dark"
              onClick={(e) => {
                e.preventDefault();
                const items = JSON.parse(localStorage.getItem('items'));

                if (items) {
                  const check = items.find(
                    (item) => item.productId === productId,
                  );
                  if (check !== undefined) {
                    const newItems = items.map((item, idx) => {
                      if (item.productId === productId) {
                        item.quantity = quantity;
                      }
                      return item;
                    });
                    localStorage.setItem('items', JSON.stringify(newItems));
                    alert('장바구니에 담았습니다.');
                    return;
                  }
                  localStorage.setItem(
                    'items',
                    JSON.stringify([
                      ...items,
                      {
                        productId,
                        quantity,
                        price,
                        title,
                      },
                    ]),
                  );
                  alert('장바구니에 담았습니다.');
                }
                if (!items) {
                  localStorage.setItem(
                    'items',
                    JSON.stringify([
                      {
                        productId,
                        quantity,
                        price,
                        title,
                      },
                    ]),
                  );
                  alert('장바구니에 담았습니다.');
                }
              }}
            >
              장바구니 추가
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();

                const items = JSON.parse(localStorage.getItem('items'));

                if (items) {
                  const check = items.find(
                    (item) => item.productId === productId,
                  );

                  if (check !== undefined) {
                    const newItems = items.map((item) => {
                      if (item.productId === productId) {
                        item.quantity = quantity;
                      }
                      return item;
                    });
                    localStorage.setItem('items', JSON.stringify(newItems));
                    navigate('/order');
                    return;
                  }
                  localStorage.setItem(
                    'items',
                    JSON.stringify([
                      ...items,
                      {
                        productId,
                        quantity,
                        price,
                        title,
                      },
                    ]),
                  );
                }
                if (!items) {
                  localStorage.setItem(
                    'items',
                    JSON.stringify([
                      {
                        productId,
                        quantity,
                        price,
                        title,
                      },
                    ]),
                  );
                }
                navigate('/order');
              }}
              variant="dark"
            >
              바로 구매
            </Button>
            <br />

            <input value={quantity}></input>
            <button
              onClick={() => {
                setQuantity((cur) => {
                  const tmp = cur;
                  if (tmp >= inventory) {
                    return tmp;
                  }
                  return tmp + 1;
                });
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                setQuantity((cur) => {
                  const tmp = cur;
                  if (tmp <= 1) {
                    return tmp;
                  }
                  return tmp - 1;
                });
              }}
            >
              -
            </button>
          </Col>
        </Row>
      </Stack>
    </Container>
  );
}

export default Product;
