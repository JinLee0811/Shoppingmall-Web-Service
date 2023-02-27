import React, { useState } from 'react';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import instance from '../../util/axios-setting';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const validatePassword = () => {
    if (newPassword !== confirmPassword) {
      console.log('password is not confirmed');
      return false;
    }
    return true;
  };
  const handleClick = () => {
    setIsChecked(!isChecked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !newPassword || !confirmPassword) {
      alert('항목이 채워지지 않았습니다.');
    } else if (validatePassword()) {
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
              if (res.data === '비번틀림') {
                alert('기존 비밀번호가 맞지 않습니다.');
              } else {
                alert('Update Success');
                navigate('/userdata');
              }
            });
        })
        .catch(() => {
          alert('기존 비밀번호가 맞지 않습니다.');
        });
    } else {
      alert('새로운 비밀번호 확인이 맞지 않습니다.');
    }
  };
  return (
    <>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <div className="text-center mb-4">
          <p>비밀번호를 변경해주세요</p>
        </div>
        <MDBInput
          wrapperClass="mb-4"
          label="비밀번호 입력"
          id="form1"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="새로운 비밀번호 입력"
          id="form1"
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <MDBInput
          wrapperClass="mb-4"
          label="새로운 비밀번호 확인"
          id="form1"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="d-flex justify-content-between mx-3 mb-4">
          <MDBCheckbox
            name="flexCheck"
            value=""
            id="flexCheckDefault"
            label="비밀번호를 변경하시겠습니까?"
            onClick={handleClick}
          />
          <a href="/main">홈으로 돌아가기</a>
        </div>
        {!isChecked ? (
          <Button variant="danger" size="lg" disabled>
            비밀번호 변경
          </Button>
        ) : (
          <Button variant="danger" size="lg" onClick={handleSubmit}>
            비밀번호 변경
          </Button>
        )}
      </MDBContainer>
    </>
  );
}

export default ChangePassword;
