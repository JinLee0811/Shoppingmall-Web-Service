import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';

import axios from 'axios';
import instance from '../../util/axios-setting';
import { verifyTokken } from '../../util/verify';
import { useNavigate } from 'react-router-dom';
import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCol,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBBadge,
  MDBBtn,
} from 'mdb-react-ui-kit';

function UserOrder() {
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
      <>
        <img src={imgSrc} width="80px" />
        <p className="fw-bold mb-1">{title}</p>
        <p className="fw-bold mb-1">{quantity}</p>
        <p className="fw-bold mb-1">{price}</p>
      </>
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
      <>
        <MDBListGroupItem className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <p className="fw-bold mb-1">{orderId}</p>
          </div>
          <div className="d-flex align-items-center">
            <p className="fw-bold mb-1">{userId}</p>
          </div>
          <div className="d-flex align-items-center">
            {order.items.map((item) => {
              return <OneItem item={item} />;
            })}
          </div>
          <p className="fw-bold mb-1">{totalPrice}</p>
          <p className="fw-bold mb-1">{status}</p>
          <p className="fw-bold mb-1">{orderDate}</p>
        </MDBListGroupItem>
      </>
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

  return (
    <MDBListGroup style={{ minWidth: '22rem' }} light>
      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div className="ms-3">
            <p className="fw-bold mb-1"></p>
          </div>
        </div>
        <p className="fw-bold mb-1">나의 주문내역</p>
        <MDBBtn size="sm" rounded color="link"></MDBBtn>
      </MDBListGroupItem>
      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <p className="fw-bold mb-1">주문 번호</p>
        </div>
        <div className="d-flex align-items-center">
          <p className="fw-bold mb-1">회원 아이디</p>
        </div>
        <div className="d-flex align-items-center">
          <p className="fw-bold mb-1">주문 상품</p>
        </div>
        <div className="d-flex align-items-center">
          <p className="fw-bold mb-1">총 가격</p>
        </div>
        <div className="d-flex align-items-center">
          <p className="fw-bold mb-1">주문 상태</p>
        </div>
        <div className="d-flex align-items-center">
          <p className="fw-bold mb-1">주문 날짜</p>
        </div>
      </MDBListGroupItem>
      {noOrder
        ? ''
        : ordersList.map((order) => {
            return <OneOrder key={order._id} order={order} />;
          })}
    </MDBListGroup>
  );
}

export default UserOrder;
