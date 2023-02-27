import React, { useEffect, useState } from 'react';
import instance from '../../util/axios-setting';
import { verifyTokken } from '../../util/verify';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Container, Nav } from 'react-bootstrap';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from 'mdb-react-ui-kit';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState('NOTUSER');
  const navigate = useNavigate();
  const [correct, setCorrect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    instance
      .post(`/api/auth/login`, userData)
      .then((res) => {
        if (res.data === '이메일이나 비번이 틀림') {
          throw new Error('');
        }
        localStorage.setItem('jwt', res.data);
      })
      .then(verifyTokken)
      .then((role) => {
        setAuth(role);
        navigate('/main');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert('로그인에 실패하였습니다.');
      });
  };

  useEffect(() => {
    verifyTokken().then(setAuth);
  }, []);
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://cdn.pixabay.com/photo/2012/02/29/12/17/bread-18987_960_720.jpg"
              height={'600'}
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: '#ff6219' }}
                />
                <span className="h1 fw-bold mb-0">#6TEAMSHOP_</span>
              </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: '1px' }}
              >
                로그인 후 이용하세요.
              </h5>
              {correct ? (
                <div style={{ color: 'red' }}>
                  이메일이 형식에 맞지 않습니다.
                </div>
              ) : (
                ''
              )}
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                value={email}
                type="email"
                size="lg"
                onChange={(e) => {
                  setEmail(e.target.value);

                  const regex =
                    /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
                  setCorrect(!regex.test(e.target.value));
                }}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                className="mb-4"
                variant="secondary"
                size="lg"
                onClick={handleSubmit}
              >
                Login
              </Button>
              <p
                className="mb-5 pb-lg-2 mall text-muted"
                style={{ color: '#393f81' }}
              >
                아직 회원이 아니신가요?
                <a
                  className="m-2"
                  href="/register"
                  style={{ color: '#393f81' }}
                >
                  이곳을 누르세요
                </a>
              </p>
              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Made by 6team.
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default LoginForm;
