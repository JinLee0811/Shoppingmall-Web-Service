import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import PopupDom from './PopupDom';
import PopupPostCode from './PopupPostCode';
import Cart from './cart';

function OrderComplete() {
  const ProductList = ({ item }) => {
    const [imgSrc, setImgSrc] = useState('');
    const [title, setTitle] = useState('');
    const [count, setCount] = useState();

    useEffect(() => {
      instance.get(`/api/products/${item.productId}`).then((res) => {
        setTitle(res.data.title);
        setCount(item.quantity);
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
          <strong>{title}</strong>
        </td>
        <td className="border-0 align-middle">
          <strong>{item.price} 원</strong>
        </td>
        <td className="border-0 align-middle">
          <strong>{count}개</strong>
          {status === '상품 준비 중' || role === 'ADMIN' ? (
            <>
              <button
                onClick={() => {
                  setCount((now) => {
                    const tmp = now;
                    return tmp + 1;
                  });
                  setItems(
                    items.map((i) => {
                      if (i.productId === item.productId) {
                        i.quantity = item.quantity + 1;
                      }
                      return i;
                    }),
                  );
                  setTotalPrice((cur) => {
                    const tmp = cur;
                    return tmp + item.price;
                  });
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  if (count === 1) {
                    return;
                  }
                  setCount((now) => {
                    const tmp = now;
                    return tmp - 1;
                  });
                  setItems(
                    items.map((i) => {
                      if (i.productId === item.productId) {
                        i.quantity = item.quantity - 1;
                      }
                      return i;
                    }),
                  );
                  setTotalPrice((cur) => {
                    const tmp = cur;
                    return tmp - item.price;
                  });
                }}
              >
                -
              </button>
              <Button
                style={{ margin: '10px' }}
                onClick={() => {
                  setItems(items.filter((i) => i.productId !== item.productId));
                  setTotalPrice((cur) => {
                    const tmp = cur;
                    return tmp - item.quantity * item.price;
                  });
                }}
                variant="outline-light"
              >
                🗑️
              </Button>
            </>
          ) : (
            ''
          )}
        </td>
      </tr>
    );
  };

  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
    if (status === '상품 준비 중' || role === 'ADMIN') {
      instance.delete(`/api/orders/${id}`).then(() => {
        alert('이 주문을 삭제합니다.');
        navigate('/orders');
      });
    }
  };
  const updateThisOrder = () => {
    if (items.length === 0) {
      instance.delete(`/api/orders/${id}`).then(() => {
        alert('물품이 없어 주문을 삭제합니다.');
      });
    } else if (
      !postalCode ||
      !address1 ||
      !address2 ||
      !receiverName ||
      !receiverPhoneNumber
    ) {
      alert('채워지지 않은 항목이 있습니다.');
      return;
    } else {
      instance
        .put(`/api/orders/${id}`, {
          items,
          address: {
            postalCode,
            address1,
            address2,
            receiverName,
            receiverPhoneNumber,
          },
          status,
        })
        .then(() => {
          alert('수정완료');
          navigate('/orders');
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
        <div className="p-3 mb-3 bg-secondary text-white">
          <h1>주문 정보</h1>
        </div>
        <Container>
          <div className="cart">
            <section className="py-3">
              <div className="container px-4 px-lg-5 my-1">
                <div className="row">
                  <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
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

                          <tr>
                            <th></th>
                            <th>Total : {totalPrice} 원</th>
                          </tr>
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
                              {status === '상품 준비 중' || role === 'ADMIN' ? (
                                <div>
                                  <Button
                                    className="mb-1"
                                    variant="secondary"
                                    size="sm"
                                    type="button"
                                    onClick={() => {
                                      setIsPopupOpen(true);
                                    }}
                                  >
                                    우편번호 검색
                                  </Button>
                                  <div id="popupDom">
                                    {isPopupOpen && (
                                      <PopupDom
                                        style={{
                                          position: 'absolute',
                                          top: '55%',
                                        }}
                                      >
                                        <PopupPostCode
                                          done={(data) => {
                                            setPostalCode(data.zonecode);
                                            setAddress1(data.address);
                                          }}
                                        />
                                      </PopupDom>
                                    )}
                                    <Button
                                      onClick={() => {
                                        setIsPopupOpen(false);
                                      }}
                                      className="mb-1"
                                      variant="secondary"
                                      size="sm"
                                      type="button"
                                    >
                                      닫기
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                ''
                              )}
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
                          {status === '상품 준비 중' || role === 'ADMIN' ? (
                            <tr>
                              <td className="align-middle">{email}</td>
                              <td className="align-middle">
                                <input
                                  style={{ width: '80px' }}
                                  type="text"
                                  value={postalCode}
                                  onChange={(e) => {
                                    setPostalCode(e.target.value);
                                  }}
                                />
                                <input
                                  style={{ width: '220px', margin: '10px' }}
                                  type="text"
                                  value={address1}
                                  onChange={(e) => {
                                    setAddress1(e.target.value);
                                  }}
                                />
                                <input
                                  type="text"
                                  value={address2}
                                  onChange={(e) => {
                                    setAddress2(e.target.value);
                                  }}
                                />
                              </td>
                              <td className="align-middle">
                                <input
                                  type="text"
                                  style={{ width: '220px' }}
                                  value={receiverPhoneNumber}
                                  onChange={(e) => {
                                    setReceiverPhoneNumber(e.target.value);
                                  }}
                                />
                              </td>
                              <td className="align-middle">
                                <input
                                  type="text"
                                  style={{ width: '100px' }}
                                  value={receiverName}
                                  onChange={(e) => {
                                    setReceiverName(e.target.value);
                                  }}
                                />
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              <td>{email}</td>
                              <td>
                                {postalCode}/{address1}/{address2}
                              </td>
                              <td>{receiverPhoneNumber}</td>
                              <td>{receiverName}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      주문 상태 :
                      {role === 'ADMIN' ? (
                        <Form.Select
                          style={{ width: '500px' }}
                          aria-label="Default select example"
                          value={status}
                          onChange={(e) => {
                            setStatus(e.target.value);
                          }}
                        >
                          <option value="상품 준비 중">상품 준비 중</option>
                          <option value="배송 중">배송 중</option>
                          <option value="배송 완료">배송 완료</option>
                        </Form.Select>
                      ) : (
                        status
                      )}
                    </div>
                    {status === '상품 준비 중' || role === 'ADMIN' ? (
                      <button
                        className="btn btn-dark rounded-pill py-2 d-md-block"
                        type="button"
                        onClick={deleteThisOrder}
                      >
                        삭제
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <a className="d-grid gap-2 col-9 mx-auto">
                  {role === 'ADMIN' || status === '상품 준비 중' ? (
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={updateThisOrder}
                    >
                      상품 정보 수정 완료
                    </Button>
                  ) : (
                    ''
                  )}
                </a>
                <a href="/orders" className="d-grid gap-2 col-9 mx-auto">
                  <Button variant="secondary" type="button">
                    상품 목록으로 가기
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
