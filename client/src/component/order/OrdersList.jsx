import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';

import axios from 'axios';
import instance from '../../util/axios-setting';

// - 주문 조회 - 사용자는 개인 페이지에서 자신의 주문 내역을 조회할 수 있다.
// - 주문 조회 - 관리자는 관리 페이지에서 사용자들의 주문 내역을 조회할 수 있다.
function OrdersList() {
  const [ordersList, setOrdersList] = useState([]);
  const [selectedRow, setSelectedRow] = useState(-1);
  const location = useLocation();
  const { id } = useParams();
  console.log('params', { id });
  const order = {
    userId: '63da14bd7d5773e4d1fb35e4',
    items: [{}, {}, {}],
    address: {},
    status: '상품 준비중',
    timestamps: '20230206000000',
  };

  useEffect(() => {
    // console.log('location', location);
    // console.log('params', params);
    instance
      .get(`/api/orders/`)
      .then((res) => {
        setOrdersList(res.data);
      })
      .then(console.log(ordersList))
      // .then(() => {
      //   instance
      //     .get(`/api/orders/${id}`)
      //     .then((res) => {
      //       setCategories(res.data);
      //     });
      // })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const SelectedRow = (e) => {
    console.log('test');
  };

  return (
    <Container fluid>
      <Row>
        <Col className="mb-2 ms-3 mr-5">
          <h1>주문 내역</h1>
          <Table bordered hover>
            <thead className="table-success">
              <tr>
                <th scope="col">#</th>
                <th scope="col">주문번호</th>
                <th scope="col">회원아이디</th>
                <th scope="col">총주문가격</th>
                <th scope="col">주문상품</th>
                <th scope="col">주문상태</th>
                <th scope="col">주문날짜</th>
              </tr>
            </thead>
            <tbody>
              {/* {orders.map((order) => {
                return (
                  <tr
                    key={userId._id}
                    value={userId._id}
                    onClick={() => setSelectedRow(userId._id)}
                  >
                    <td>#</td>
                    <td>{order._id}</td>
                    <td>{userId}</td>
                    <td>{items.price}</td>
                    <td>{items.productId}</td>
                    <td>{status}</td>
                    <td>{timestamps}</td>
                  </tr>
                );
              })} */}
            </tbody>
          </Table>
        </Col>
      </Row>
      <h1>테스트</h1>
      <Row>
        <Col className="mb-2 ms-3 mr-5">
          <Table bordered hover>
            <thead className="table-success">
              <tr>
                <th scope="col">#</th>
                <th scope="col">주문번호</th>
                <th scope="col">회원아이디</th>
                <th scope="col">총주문가격</th>
                <th scope="col">주문상품</th>
                <th scope="col">주문상태</th>
                <th scope="col">주문날짜</th>
              </tr>
            </thead>
            <tbody>
              <tr key="testkey" onClick={SelectedRow}>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Thornton</td>

                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>

                <td>@fat</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>

                <td>@fat</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Mark</td>
                <td>Otto</td>

                <td>Thornton</td>
                <td>@fat</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>

                <td>@fat</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>#</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
                <td colSpan={4}>Larry the Bird</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default OrdersList;
