import React, { useState } from 'react';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import instance from '../../util/axios-setting';

function UserWithdrawal() {
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState('');

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('check');
    instance
      .delete(`/api/auth/withdrawal`, password)
      .then((res) => console.log(res.data))
      .catch(() => console.log('error'));
  };

  return (
    <div>
      <Container>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
          <Col sm>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form className="mb-3">
          <Form.Check
            type="checkbox"
            label="회원을 탈퇴하시겠습니까?"
            onClick={handleClick}
          />
        </Form>
        {!isChecked ? (
          <Button variant="danger" size="lg" disabled>
            회원 탈퇴
          </Button>
        ) : (
          <Button variant="danger" size="lg" onClick={handleSubmit}>
            회원 탈퇴
          </Button>
        )}
      </Container>
    </div>
  );
}

export default UserWithdrawal;
