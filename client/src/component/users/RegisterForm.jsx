import React, { useState } from 'react';
import { Button, Form, Row, Col, Container, Nav } from 'react-bootstrap';
import axios from 'axios';
import instance from '../../util/axios-setting';

function RegisterForm() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [EmailCorrect, setEmailCorrect] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [nameCorrect, setNameCorrect] = useState(false);

  const validateName = () => {
    if (name.length < 1) {
      setError('please input name');
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError('password is not confirmed');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      fullName: name,
      password,
    };
    if (true) {
      instance
        .post(`/api/auth/register`, userData)
        .then((res) => {
          console.log(res.data);
          instance.post(`/api/auth/login`, { email, password });
          alert('회원가입이 완료되었습니다.');
        })
        .catch((err) => {
          alert('회원가입에 실패했습니다.');
        });
    } else {
      alert(error);
    }
  };

  return (
    <div>
      <Container className="panel">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
            <Col sm>
              <Form.Control
                type="email"
                placeholder="Email Address"
                onChange={(e) => {
                  const regex =
                    /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
                  setEmailCorrect(!regex.test(e.target.value));
                  setEmail(e.target.value);
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Col sm>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
            <Col sm>
              <Form.Control
                type="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            size="lg"
            className="mb-3"
            controlId="formPlaintext"
          >
            <Col sm xs={3}>
              <Form.Label>Address</Form.Label>
              <Form.Control type="address" placeholder="code" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm>
              <Form.Control type="address" placeholder="address1" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
            <Col sm>
              <Form.Control type="address" placeholder="address2" />
            </Col>
          </Form.Group>
          <br />

          <div className="d-grid gap-1">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              회원가입
            </Button>
            <Button variant="secondary" type="submit">
              <Nav.Link href="/login">뒤로 가기</Nav.Link>
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default RegisterForm;
