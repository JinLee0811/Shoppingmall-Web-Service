import React, { useState } from 'react';
import { Button, Form, Row, Col, Container, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import instance from '../../util/axios-setting';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from 'mdb-react-ui-kit';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailCorrect, setEmailCorrect] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(true);
  const [nameCorrect, setNameCorrect] = useState(false);
  const [noPassword, setNoPassword] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameCorrect && emailCorrect && passwordCorrect) {
      instance
        .post(`/api/auth/register`, { email, password, fullName: name })
        .then((res) => {
          console.log(res.data);
          alert('회원가입이 완료되었습니다.');
          instance.post('/api/auth/login', { email, password }).then((res) => {
            localStorage.setItem('jwt', res.data);
            alert('로그인됩니다.');
            navigate('/main');
            window.location.reload();
          });
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert('항목이 조건에 맞지 않습니다.');
    }
  };
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="8">
          <MDBCard className="my-5 rounded-3" style={{ maxWidth: '600px' }}>
            <MDBCardImage
              src="https://cdn.pixabay.com/photo/2016/11/29/05/07/breads-1867459_960_720.jpg"
              className="w-70 rounded-top"
              alt="Sample photo"
              height={'300'}
            />

            <MDBCardBody className="px-5">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">회원가입</h3>
              {!emailCorrect ? (
                <div style={{ color: 'red' }}>
                  이메일이 형식에 맞지 않습니다.
                </div>
              ) : (
                ''
              )}
              <MDBInput
                wrapperClass="mb-4"
                label="이메일"
                id="form1"
                type="email"
                onChange={(e) => {
                  const regex =
                    /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
                  setEmailCorrect(regex.test(e.target.value));
                  setEmail(e.target.value);
                }}
              />
              {!passwordCorrect ? (
                <div style={{ color: 'red' }}>
                  확인 비밀번호가 일치하지 않습니다.
                </div>
              ) : (
                ''
              )}
              {noPassword ? (
                <div style={{ color: 'red' }}>
                  비밀번호가 형식에 맞지 않습니다.
                </div>
              ) : (
                ''
              )}
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="datepicker mb-4"
                    label="비밀번호"
                    id="form2"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (!e.target.value) {
                        setNoPassword(true);
                      } else {
                        setNoPassword(false);
                      }
                      if (confirmPassword !== e.target.value) {
                        setPasswordCorrect(false);
                      } else {
                        setPasswordCorrect(true);
                      }
                    }}
                  />
                </MDBCol>

                <MDBCol md="6" className="mb-4">
                  <MDBInput
                    wrapperClass="datepicker mb-4"
                    label="비밀번호 재확인"
                    id="form2"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (password !== e.target.value) {
                        setPasswordCorrect(false);
                      } else {
                        setPasswordCorrect(true);
                      }
                    }}
                  />
                </MDBCol>
              </MDBRow>
              <MDBCol md="6">
                {!nameCorrect ? (
                  <div style={{ color: 'red' }}>
                    이름이 작성되지 않았습니다.
                  </div>
                ) : (
                  ''
                )}
                <MDBInput
                  wrapperClass="datepicker mb-4"
                  label="이름"
                  id="form2"
                  type="name"
                  value={name}
                  onChange={(e) => {
                    if (e.target.value.length === 0) {
                      setNameCorrect(false);
                    } else {
                      setNameCorrect(true);
                    }
                    setName(e.target.value);
                  }}
                />
              </MDBCol>
              <Button
                onClick={handleSubmit}
                className="mb-4"
                variant="secondary"
                size="lg"
              >
                회원가입하기
              </Button>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default RegisterForm;
