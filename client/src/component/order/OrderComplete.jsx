import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  BreadcrumbItem,
  Form,
} from 'react-bootstrap';
import instance from '../../util/axios-setting';
import { verifyTokken } from '../../util/verify';

function OrderComplete() {
  const ProductList = ({ item }) => {
    const [imgSrc, setImgSrc] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
      instance.get(`/api/products/${item.productId}`).then((res) => {
        setTitle(res.data.title);
        instance
          .get(`/api/products/img/${res.data.imageKey}`, {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            responseType: 'blob',
          })
          .then((res) => {
            const getfile = new File([res.data], item.imageKey);
            const reader = new FileReader();
            reader.onload = (event) => {
              const previewImage = String(event.target?.result);
              setImgSrc(previewImage);
            };
            reader.readAsDataURL(getfile);
          });
      });
    }, []);

    return (
      <tr>
        <td scope="row" className="border-0">
          <img style={{ width: '70px' }} src={imgSrc} key={item.productId} />
        </td>
        <td className="border-0 align-middle">
          <strong>{title}</strong>
        </td>
        <td className="border-0 align-middle">
          <strong>{item.price} 원</strong>
        </td>
        <td className="border-0 align-middle">
          <strong>{item.quantity} 개</strong>
        </td>
      </tr>
    );
  };

  const { id } = useParams();
  const [postalCode, setPostalCode] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState();
  const [receiverName, setReceiverName] = useState();
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [status, setStatus] = useState();
  const [role, setRole] = useState();
  const navigate = useNavigate();

  const deleteThisOrder = () => {
    if (status === '상품 준비 중') {
      instance.delete(`/api/orders/${id}`).then(() => {
        navigate('/admin/orders');
      });
    }
  };

  useEffect(() => {
    verifyTokken().then(setRole);
    instance
      .get(`/api/orders/${id}`)
      .then((res) => {
        const total = res.data.items.reduce((price, product) => {
          return price + product.price * product.quantity;
        }, 0);
        setTotalPrice(total);
        console.log(res.data);
        setAddress1(res.data.address.address1);
        setAddress2(res.data.address.address2);
        setPostalCode(res.data.address.postalCode);
        setReceiverName(res.data.address.receiverName);
        setReceiverPhoneNumber(res.data.address.receiverPhoneNumber);
        setItems(res.data.items);
        setStatus(res.data.status);
        return res.data.userId;
      })
      .then((id) => {
        instance.get(`/api/users/${id}`).then((res) => {
          setEmail(res.data.email);
        });
      });
  }, []);
  return (
    <>
      <Container>
        <Container>
          <div className="cart">
            <section className="py-3">
              <div className="container px-4 px-lg-5 my-1">
                <div className="row">
                  <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                    <div className="p-3 mb-3 bg-secondary text-white">
                      <h1>주문 완료</h1>
                    </div>
                    <div className="mb-5">주문해 주셔서 감사합니다.</div>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col" className="border-0 bg-light">
                              <div className="p-2 px-3 text-uppercase">
                                상품목록
                              </div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                              <div className="p-2 px-3 text-uppercase">
                                상품이름
                              </div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                              <div className="py-2 text-uppercase">가격</div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                              <div className="py-2 text-uppercase">수량</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => {
                            return (
                              <ProductList key={item.productId} item={item} />
                            );
                          })}

                          <th scope="col" className="border-0 bg-light">
                            <div className="p-5 px-2 text-uppercase">
                              총 결제 금액 : {totalPrice} 원
                            </div>
                          </th>
                        </tbody>
                      </table>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col" className="border-0 bg-light">
                              <div className="p-2 px-3 text-uppercase">
                                구매자 정보
                              </div>
                            </th>
                          </tr>
                          <tr>
                            <th scope="col" className="border-0 bg-light">
                              <div className="p-2 px-3 text-uppercase">
                                이메일
                              </div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                              <div className="p-2 px-3 text-uppercase">
                                주소
                              </div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                              <div className="p-2 px-3 text-uppercase">
                                휴대폰 번호
                              </div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                              <div className="p-2 px-3 text-uppercase">
                                이름
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="align-middle">{email}</td>
                            <td className="align-middle">
                              {postalCode} / {address1} / {address2}
                            </td>
                            <td className="align-middle">
                              {receiverPhoneNumber}
                            </td>
                            <td className="align-middle">{receiverName}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div>주문 상태 : {status}</div>
                  </div>
                </div>
                <a href="/orders" className="d-grid gap-2 col-9 mx-auto">
                  <Button variant="secondary" size="lg">
                    주문 목록으로 가기
                  </Button>
                </a>
              </div>
            </section>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default OrderComplete;
