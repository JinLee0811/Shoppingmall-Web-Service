import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Container, Nav } from 'react-bootstrap';
import instance from '../../util/axios-setting';

function UserData() {
  const [users, setUsers] = useState([]);
  const [code, setCode] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  useEffect(() => {
    instance
      .get(`/api/users/me`)
      .then((res) => {
        setUsers(res.data);
        if (res.data.address) {
          setCode(res.data.address.postalCode);
          setAddress1(res.data.address.address1);
          setAddress2(res.data.address.address2);
        }
      })
      .catch(() => console.log('error'));
  }, []);

  return (
    <div>
      <Container className="panel">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="id" placeholder={users.email} disabled />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm>
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" placeholder={users.fullName} disabled />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm xs={3}>
              <Form.Label>Address</Form.Label>
              <Form.Control type="address" placeholder={code} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm>
              <Form.Control type="address" placeholder={address1} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm>
              <Form.Control type="address" placeholder={address2} />
            </Col>
          </Form.Group>
          <br />
          <Button variant="warning" size="lg">
            <Nav.Link href="/change-password">비밀번호 수정</Nav.Link>
          </Button>
          <br />
          <br />
          <br />
          <Button variant="secondary" size="lg">
            <Nav.Link href="/">주문내역 조회</Nav.Link>
          </Button>
          <br />
          <br />
          <br />

          <Button variant="danger" size="lg">
            <Nav.Link href="/user-withdrawal">회원 탈퇴</Nav.Link>
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default UserData;
