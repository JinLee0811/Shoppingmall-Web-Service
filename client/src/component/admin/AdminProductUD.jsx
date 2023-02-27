import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Table,
  FloatingLabel,
} from 'react-bootstrap';
import { useEffect } from 'react';
import instance from '../../util/axios-setting';

function AdminProductUD() {
  const ProductTable = ({ product }) => {
    const category = categories.find((data) => data._id === product.categoryId);
    const [title, setTitle] = useState(product.title);
    const [shortDescription, setShortDescription] = useState(
      product.shortDescription,
    );
    const [detailDescription, setDetailDescription] = useState(
      product.detailDescription,
    );
    const [price, setPrice] = useState(product.price);
    const [inventory, setInventory] = useState(product.inventory);
    const [categoryId, setCategoryId] = useState(product.categorId);
    const [imgSrc, setImgSrc] = useState('');
    const [currentImgSrc, setCurrentImgSrc] = useState('');
    const [file, setFile] = useState('');
    useEffect(() => {
      instance
        .get(`/api/products/img/${product.imageKey}`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          responseType: 'blob',
        })
        .then((res) => {
          const getfile = new File([res.data], product.imageKey);
          const reader = new FileReader();
          reader.onload = (event) => {
            const previewImage = String(event.target?.result);
            console.log(previewImage);
            setCurrentImgSrc(previewImage);
          };
          reader.readAsDataURL(getfile);
        });
    }, []);

    const updateHandler = (e) => {
      e.preventDefault();

      const formdata = new FormData();
      if (file) {
        formdata.append('imageKey', file);
      }
      if (categoryId !== product.categorId) {
        formdata.append('categoryId', categoryId);
      }
      if (title !== product.title) {
        formdata.append('title', title);
      }
      if (price !== product.price) {
        formdata.append('price', price);
      }
      if (shortDescription !== product.shortDescription) {
        formdata.append('shortDescription', shortDescription);
      }
      if (detailDescription !== product.detailDescription) {
        formdata.append('detailDescription', detailDescription);
      }
      if (inventory !== product.inventory) {
        formdata.append('inventory', inventory);
      }
      instance
        .put(`/api/products/${product._id}`, formdata, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          instance.get(`/api/products`).then((res) => {
            setProducts(res.data);
          });
        });
    };
    const deleteHandler = (e) => {
      e.preventDefault();
      instance.delete(`/api/products/${product._id}`).then((res) => {
        instance
          .get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/products`)
          .then((res) => {
            setProducts(res.data);
          });
      });
    };

    return (
      <tr>
        <td style={{ width: '400px' }}>
          <img style={{ width: '100%' }} src={currentImgSrc} alt="current" />
          <img style={{ width: '100%' }} src={imgSrc} alt="change" />
          <Form.Control
            type="file"
            onChange={(e) => {
              e.preventDefault();
              const upfile = e.target.files[0];
              const reader = new FileReader();
              reader.readAsDataURL(upfile);
              reader.onloadend = () => {
                setImgSrc(reader.result);
                console.log('changed');
              };
              setFile(upfile);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setImgSrc('');
              setFile('');
            }}
            type="submit"
          >
            Reset
          </button>
        </td>
        <td style={{ width: '600px' }}>
          <FloatingLabel label="Title" className="">
            <Form.Control
              //defaultValue={product.title}
              value={title}
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
            />
          </FloatingLabel>
          <FloatingLabel label="Short Description" className="">
            <Form.Control
              // defaultValue={product.shortDescription}
              value={shortDescription}
              onChange={(e) => {
                e.preventDefault();
                setShortDescription(e.target.value);
              }}
            />
          </FloatingLabel>

          <FloatingLabel label="Detail" className="">
            <Form.Control
              // defaultValue={product.detailDescription}
              value={detailDescription}
              onChange={(e) => {
                e.preventDefault();
                setDetailDescription(e.target.value);
              }}
            />
          </FloatingLabel>

          <FloatingLabel label="Price" className="">
            <Form.Control
              // defaultValue={product.price}
              value={price}
              onChange={(e) => {
                e.preventDefault();
                setPrice(e.target.value);
              }}
            />
          </FloatingLabel>

          <FloatingLabel label="Inventory">
            <Form.Control
              // defaultValue={product.inventory}
              value={inventory}
              onChange={(e) => {
                e.preventDefault();
                setInventory(e.target.value);
              }}
            />
          </FloatingLabel>

          <FloatingLabel label="Category" className="">
            <Form.Control
              defaultValue={category ? category.title : '없음'}
              readOnly
            />
          </FloatingLabel>
          <Form.Select
            defaultValue={product.categoryId}
            value={categoryId}
            onChange={(e) => {
              e.preventDefault();
              setCategoryId(e.target.value);
            }}
          >
            <option>변경할 카테고리 고르세요.</option>
            {categories.map((data) => {
              return (
                <option key={data._id} value={data._id}>
                  {data.title}
                </option>
              );
            })}
          </Form.Select>
        </td>
        <td>
          <Button variant="warning" onClick={updateHandler}>
            수정
          </Button>
          <Button variant="danger" onClick={deleteHandler}>
            삭제
          </Button>
        </td>
      </tr>
    );
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    instance
      .get(`/api/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .then(() => {
        instance.get(`/api/categories`).then((res) => {
          setCategories(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Image</th>
            <th>정보</th>
            <th>수정/삭제</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return <ProductTable key={product._id} product={product} />;
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminProductUD;
