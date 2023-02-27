import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Form,
  Stack,
  Row,
  Col,
  Container,
  Nav,
  FloatingLabel,
  Modal,
} from 'react-bootstrap';
import instance from '../../util/axios-setting';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  //하단 버튼
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  //등록하기 버튼 핸들러
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //작성취소 버튼 핸들러
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  const [categoryId, setCategoryId] = useState('');
  const [title, setTitle] = useState();
  const [price, setPrice] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [detailDescription, setDetailDescription] = useState('');
  const [inventory, setInventory] = useState('');
  const [file, setFile] = useState('');

  const navigate = useNavigate();

  const handleCategory = (event) => {
    event.preventDefault();
    setCategoryId(event.target.value);
  };
  const handleTitle = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };
  const handlePrice = (event) => {
    event.preventDefault();
    setPrice(Number(event.target.value));
  };
  const handleInventory = (event) => {
    event.preventDefault();
    setInventory(Number(event.target.value));
  };
  const handleShortdisc = (event) => {
    event.preventDefault();
    setShortDescription(event.target.value);
  };
  const handleDisc = (event) => {
    event.preventDefault();
    setDetailDescription(event.target.value);
  };

  const onChangeImg = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setFile(uploadFile);
    }
  };
  const onClickEvent = (e) => {
    e.preventDefault();
    if (
      !file ||
      !categoryId ||
      !title ||
      !price ||
      !shortDescription ||
      !detailDescription ||
      !inventory
    ) {
      return;
    }
    const formdata = new FormData();
    formdata.append('imageKey', file);
    formdata.append('categoryId', categoryId);
    formdata.append('title', title);
    formdata.append('price', price);
    formdata.append('shortDescription', shortDescription);
    formdata.append('detailDescription', detailDescription);
    formdata.append('inventory', inventory);
    instance
      .post(`/api/products`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        window.location.reload();
      });
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    instance.get(`/api/categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <Container fluid="md">
      <div>
        <h1 className="p-3 mb-3 bg-secondary text-white">상품 추가 페이지</h1>
      </div>
      <div>
        <Form.Label htmlFor="SelectCategory">카테고리</Form.Label>
        <Form.Select
          className="mb-4"
          id="SelectCategory"
          aria-label="Default select example"
          onChange={handleCategory}
        >
          <option>카테고리를 선택해주세요</option>
          {categories.map((data) => {
            return (
              <option key={data._id} value={data._id}>
                {data.title}
              </option>
            );
          })}
        </Form.Select>
      </div>
      <Stack gap={1}>
        <div>
          <Form.Label htmlFor="ProductTitle">제품이름</Form.Label>
          <FloatingLabel
            controlId="floatingTextarea"
            label="제품의 이름을 적어주세요"
            className="mb-4"
            onChange={handleTitle}
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>
        </div>
      </Stack>
      <Stack gap={2}>
        <Row>
          <Col>
            <Form.Label htmlFor="ProductTitle">제품가격</Form.Label>
            <FloatingLabel
              controlId="floatingTextarea"
              label="제품의 가격을 적어주세요"
              className="mb-4"
              type="Number"
              onChange={handlePrice}
            >
              <Form.Control
                type="text"
                onChange={handleShortdisc}
                as="textarea"
                placeholder="Leave a comment here"
              />
            </FloatingLabel>
          </Col>
          <Col>
            <Form.Label htmlFor="ProductTitle">제품 수량</Form.Label>
            <FloatingLabel
              controlId="floatingTextarea"
              label="제품의 수량을 확인하세요"
              className="mb-4"
              type="Number"
              onChange={handleInventory}
            >
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Leave a comment here"
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Stack>
      <Stack gap={2}>
        <div>
          <Form.Label htmlFor="ProductTitle">요약 설명</Form.Label>
          <FloatingLabel
            controlId="floatingTextarea"
            label="제품을 1~2 문장으로 설명해주세요"
            className="mb-4"
            type="text"
            onChange={handleShortdisc}
          >
            <Form.Control as="textarea" placeholder="Leave a comment here" />
          </FloatingLabel>
          <Form.Label htmlFor="ProductTitle">상세 설명</Form.Label>
          <FloatingLabel
            controlId="floatingTextarea2"
            label="제품에 대한 상세 설명을 적어 주세요."
            type="text"
            onChange={handleDisc}
          >
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '110px' }}
              className="mb-4"
              type="text"
            />
          </FloatingLabel>
        </div>
        <Form.Group
          controlId="formFile"
          className="mb-4"
          id="profile-upload"
          accept="image/*"
          onChange={onChangeImg}
        >
          <Form.Label>이미지를 업로드 해주세요</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
      </Stack>

      <Col>
        <Button variant="primary" onClick={handleShow}>
          등록하기
        </Button>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>제품 등록 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>바로 제품을 등록하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              <Nav.Link onClick={onClickEvent} href="/admin/product">
                등록하기
              </Nav.Link>
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              취소하기
            </Button>
          </Modal.Footer>
        </Modal>

        <Button variant="secondary" onClick={handleShow2}>
          취소하기
        </Button>
        <Modal show={show2} onHide={handleClose2} animation={false}>
          <Modal.Header closeButton2>
            <Modal.Title>제품 취소 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>작성중인 작업을 취소하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose2}>
              계속해서 작성하기
            </Button>
            <Button variant="secondary" onClick={handleClose2}>
              작성 취소
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Container>
  );
}
export default AddProduct;
