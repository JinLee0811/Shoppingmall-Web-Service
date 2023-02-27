import axios from 'axios';
import React, { memo, useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import instance from '../../util/axios-setting';
import { useMemo } from 'react';

const Cart = ({ order, update }) => {
  const Image = ({ product }) => {
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
      instance.get(`/api/products/${product.productId}`).then((res) => {
        instance
          .get(`/api/products/img/${res.data.imageKey}`, {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            responseType: 'blob',
          })
          .then((res) => {
            console.log('lfjskd');
            const getfile = new File([res.data], product.imageKey);
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
      <td>
        <img
          style={{ width: '100px', height: '100px' }}
          src={`${imgSrc}`}
          alt="img"
        />
      </td>
    );
  };

  const ProductList = ({ product, update }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      setCount(Number(product.quantity));
    }, []);

    return (
      <>
        <td className="border-0 align-middle">
          <strong>{product.title}</strong>
        </td>
        <td className="border-0 align-middle">
          <strong>{product.price} 원</strong>
        </td>
        {update ? (
          <>
            <td className="border-0 align-middle">
              <strong>{count} 개</strong>
              <Button
                variant="light"
                onClick={() => {
                  setCount((now) => {
                    const tmp = now;
                    return Number(tmp) + 1;
                  });
                  const storage = JSON.parse(localStorage.getItem('items'));

                  const array = storage.map((i) => {
                    if (i.productId === product.productId) {
                      i.quantity = Number(count) + 1;
                    }
                    return i;
                  });
                  localStorage.setItem('items', JSON.stringify(array));
                  setTotalPrice((cur) => {
                    const tmp = cur;
                    return tmp + product.price;
                  });
                }}
              >
                +
              </Button>
              <Button
                variant="light"
                onClick={() => {
                  if (count === 1) {
                    return;
                  }
                  setCount((now) => {
                    const tmp = now;
                    return Number(tmp) - 1;
                  });
                  const storage = JSON.parse(localStorage.getItem('items'));
                  const array = storage.map((i) => {
                    if (i.productId === product.productId) {
                      i.quantity = Number(count) - 1;
                    }
                    return i;
                  });
                  localStorage.setItem('items', JSON.stringify(array));
                  setTotalPrice((cur) => {
                    const tmp = cur;
                    return tmp - product.price;
                  });
                }}
              >
                -
              </Button>
            </td>
            <td className="border-0 align-middle">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setProducts(() => {
                    const newProducts = products.filter(
                      (prod) => prod.productId !== product.productId,
                    );
                    const total = newProducts.reduce((price, product) => {
                      return price + product.price * product.quantity;
                    }, 0);
                    setTotalPrice(total);
                    localStorage.setItem('items', JSON.stringify(newProducts));
                    if (newProducts.length === 0) {
                      setEmpty(true);
                    }
                    return newProducts;
                  });
                }}
                variant="outline-light"
              >
                <text>🗑️</text>
              </Button>
            </td>
          </>
        ) : (
          <td className="border-0 align-middle">
            <strong>{count} 개</strong>
          </td>
        )}
      </>
    );
  };

  const deleteAll = (e) => {
    localStorage.removeItem('items');
    setProducts([]);
    setEmpty(true);
    setTotalPrice(0);
  };

  const [products, setProducts] = useState([{}]);
  const [empty, setEmpty] = useState(true);

  const [totalPrice, setTotalPrice] = useState(0);

  const ImgComp = useMemo(() => {
    const array = JSON.parse(localStorage.getItem('items'));
    if (array === null) {
      return (
        <th scope="col" className="border-1 bg-light">
          <div className="py-4 text-uppercase">장바구니가 비었습니다</div>
        </th>
      );
    } else if (array.length === 0) {
      return (
        <th scope="col" className="border-1 bg-light">
          <div className="py-4 text-uppercase">장바구니가 비었습니다</div>
        </th>
      );
    }
    return (
      <>
        {array.map((product) => {
          return (
            <tr>
              <Image product={product} />
              <ProductList product={product} update={update} />
            </tr>
          );
        })}
      </>
    );
  }, [products]);

  useEffect(() => {
    setTotalPrice(0);
    const array = JSON.parse(localStorage.getItem('items'));
    if (array === null) {
      setEmpty(true);
    } else if (array.length !== 0) {
      setEmpty(false);
      setProducts(array);
      const total = array.reduce((price, product) => {
        return price + product.price * product.quantity;
      }, 0);
      setTotalPrice(total);
    }
  }, []);

  return (
    <div className="cart">
      <h1 className="container px-4 px-lg-5 my-5"></h1>

      <section className="py-1">
        <div className="container px-4 px-lg-5 my-1">
          <div className="row">
            <div className="col-lg-13 p-5 bg-white rounded shadow-sm mb-5">
              <h1>Your Cart</h1>
              <Button
                className="px-lg-2 my-3 mb-2"
                variant="secondary"
                onClick={deleteAll}
              >
                전체 비우기
              </Button>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">상품목록</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">상품이름</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">가격</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">수량</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">삭제하기</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ImgComp}
                    {!empty ? (
                      <tr className="d-flex justify-content-between py-3 border-bottom">
                        <th className="text-muted border-0 bg-light">
                          총 가격
                        </th>
                        <th
                          style={{ color: 'red' }}
                          className="fw-bold border-0 bg-light"
                        >
                          {totalPrice}원
                        </th>
                      </tr>
                    ) : (
                      ''
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {order || empty ? (
          ''
        ) : (
          <a href="/order" className="d-grid gap-2 col-9 mx-auto">
            <Button variant="secondary" size="lg">
              구매 하러가기
            </Button>
          </a>
        )}
      </section>
    </div>
  );
};
export default Cart;
