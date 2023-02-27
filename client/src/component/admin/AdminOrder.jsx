import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';

import axios from 'axios';
import instance from '../../util/axios-setting';
import { verifyTokken } from '../../util/verify';
import { useNavigate } from 'react-router-dom';

function AdminOrder() {
  const OneItem = ({ item }) => {
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const [imgSrc, setImgSrc] = useState();
    const [title, setTitle] = useState();

    useEffect(() => {
      setQuantity(item.quantity);
      setPrice(item.price);
      instance.get(`/api/products/${item.productId}`).then((res) => {
        setTitle(res.data.title);
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
      });
    }, []);
    return (
      <tr>
        <td>
          <img src={imgSrc} width="80px" />
          <div>{title}</div>
          <div>수량 : {quantity}</div>
          <div>개당 가격 : {price}</div>
        </td>
      </tr>
    );
  };
  const OneOrder = ({ order }) => {
    const [orderId, setOrderId] = useState();
    const [userId, setUserId] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [status, setStatus] = useState();
    const [orderDate, setOrderDate] = useState();
    useEffect(() => {
      console.log(order);
      setOrderId(order._id);
      setUserId(order.userId);
      setStatus(order.status);
      setOrderDate(order.createdAt);
      setTotalPrice(
        order.items.reduce((total, item) => {
          return total + item.price * item.quantity;
        }, 0),
      );
    }, []);

    const orderClick = (e) => {
      navigate(`/order/${order._id}`);
    };

    return (
      <tr onClick={orderClick}>
        <td>#</td>
        <td>
          {order.items.map((item) => {
            return <OneItem item={item} />;
          })}
        </td>
        <td>{orderId}</td>
        <td>{userId}</td>
        <td>{totalPrice}</td>
        <td>{status}</td>
        <td>{orderDate}</td>
      </tr>
    );
  };

  const [ordersList, setOrdersList] = useState([]);
  const [noOrder, setNoOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyTokken().then((role) => {
      if (role === 'NOTUSER') {
        navigate('/main');
      }
    });
    instance
      .get(`/api/orders`)
      .then((res) => {
        console.log('asd' + res.data);
        if (!res.data) {
          setNoOrder(true);
        }
        setOrdersList(res.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const objOrder = {
    header: [
      '#',
      '주문상품',
      '회원아이디',
      '주문번호',
      '총주문가격',
      '주문상태',
      '주문날짜',
    ],
  };

  return (
    <Container fluid className="bg-white">
      <Row>
        <Col className="mb-2 ms-3 mr-5">
          <p className="fw-bold mb-1">나의 주문내역</p>

          <Table striped bordered hover>
            <thead>
              <tr>
                {objOrder.header.map((item) => {
                  return <th>{item}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {noOrder
                ? ''
                : ordersList.map((order) => {
                    return <OneOrder key={order._id} order={order} />;
                  })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminOrder;
