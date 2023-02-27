import React, { useState } from 'react';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import instance from '../../util/axios-setting';

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      console.log('password is not confirmed');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validatePassword()) {
      instance
        .get(`api/users/me`)
        .then((res) => {
          const userID = res.data._id;
          instance
            .put(`/api/users/${userID}/password`, {
              password: password,
              newPassword: newPassword,
            })
            .then((res) => {
              console.log(res.data);
              alert('Update Success');
            });
        })
        .catch(() => console.log('error'));
    }
  };

  return (
    <div>
      <Container>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button variant="primary" size="lg" onClick={handleSubmit}>
            수정하기
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default ChangePassword;
