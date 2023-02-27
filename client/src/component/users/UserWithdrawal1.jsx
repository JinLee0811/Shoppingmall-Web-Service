import React, { useState } from 'react';
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import instance from '../../util/axios-setting';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

function UserWithdrawal() {
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .delete(`/api/auth/withdrawal`, { data: { password } })
      .then((res) => {
        console.log(res.data);
        if (res.data === '비번이 틀림') {
          alert('비밀번호 틀렸습니다.');
        } else {
          alert('탈퇴되었습니다.');
          localStorage.removeItem('jwt');
          navigate('/main');
          window.location.reload();
        }
      })
      .catch(() => {});
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <div className="text-center mb-4">
        <p>6TEAMSHOP을 이용해주셔서 감사했습니다</p>
      </div>
      <MDBInput
        wrapperClass="mb-4"
        label="비밀번호 입력"
        id="form1"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="회원을 탈퇴하시겠습니까?"
          onClick={handleClick}
        />
        <a href="/main">홈으로 돌아가기</a>
      </div>
      {!isChecked ? (
        <Button variant="danger" size="lg" disabled>
          회원 탈퇴
        </Button>
      ) : (
        <Button variant="danger" size="lg" onClick={handleSubmit}>
          회원 탈퇴
        </Button>
      )}
    </MDBContainer>
  );
}

export default UserWithdrawal;
