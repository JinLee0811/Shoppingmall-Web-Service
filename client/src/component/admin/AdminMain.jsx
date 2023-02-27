// import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import AdminCategory from './AdminCategory';
import AdminProduct from './AddProduct';
import AdminOrder from './AdminOrder';
import AdminProductUD from './AdminProductUD';
import AdminUserDB from './AdminUserDB';

function AdminMain() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <br />
      <Row>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="menu1">카테고리관리</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="menu2">상품추가</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="menu3">상품관리</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="menu4">주문관리</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="menu5">유저관리</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="menu1">
              <AdminCategory />
            </Tab.Pane>
            <Tab.Pane eventKey="menu2">
              <AdminProduct />
            </Tab.Pane>
            <Tab.Pane eventKey="menu3">
              <AdminOrder />
            </Tab.Pane>
            <Tab.Pane eventKey="menu4">
              <AdminProductUD />
            </Tab.Pane>
            <Tab.Pane eventKey="menu5">
              <AdminUserDB />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}
export default AdminMain;
