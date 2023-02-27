import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import instance from '../../util/axios-setting';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from 'mdb-react-ui-kit';

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
    <div className="vh-100" style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    className="rounded-circle"
                    fluid
                    style={{ width: '100px' }}
                  />
                </div>
                <MDBTypography tag="h4">{users.fullName}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  나의 이메일<span className="mx-2">|</span>
                  <span className="mx-2">{users.email}</span>
                </MDBCardText>
                <Button variant="secondary" size="lg" href="/orders">
                  주문 내역 보기
                </Button>
                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <Link className="nav-link active m-3" to={'/main'}>
                      홈으로 가기
                    </Link>
                    <MDBCardText
                      variant="light"
                      className="small text-muted mb-0"
                    >
                      Go back to home
                    </MDBCardText>
                  </div>
                  <div className="px-3">
                    <Link
                      className="nav-link active m-3"
                      to={'/change-password'}
                    >
                      비밀번호 변경
                    </Link>
                    <MDBCardText
                      variant="light"
                      className="small text-muted mb-0"
                    >
                      Change Password
                    </MDBCardText>
                  </div>
                  <div>
                    <Link
                      className="nav-link active m-3"
                      to={'/user-withdrawal'}
                    >
                      회원 탈퇴
                    </Link>
                    <MDBCardText className="small text-muted mb-0">
                      Withdrawal
                    </MDBCardText>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default UserData;
