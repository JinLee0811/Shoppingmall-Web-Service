import React, { useState, useEffect } from 'react';
import { Container, Row, Form } from 'react-bootstrap';
import ProductCard from './ProductCard';
import instance from '../../util/axios-setting';
import queryString from 'query-string';

function CategoryProducts() {
  let qs = queryString.parse(window.location.search);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  const categoryProduct = async () => {
    const [cres, pres] = await Promise.all([
      instance.get(`/api/categories`),
      instance.get(`/api/products`),
    ]);
    setCategories(cres.data);
    if (qs.category) {
      const res = await instance.get(
        `/api/categories/?categoryId=${qs.category}`,
      );
      setProducts(res.data);
    } else {
      setProducts(pres.data);
    }
  };

  useEffect(() => {
    categoryProduct();
  }, []);

  const selectCategoryHandler = (event) => {
    event.preventDefault();

    setCategoryId(event.target.value);
    if (event.target.value === '카테고리를 선택해주세요') {
      return;
    }
    instance
      .get(`/api/categories/?categoryId=${event.target.value}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="cart">
        <h1 className="container px-4 px-lg-5 my-5"></h1>
        <section className="py-1">
          <div className="container px-4 px-lg-5 my-1">
            <div className="row">
              <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 bg-light">
                          <div className="p-2 px-3 text-uppercase">
                            <Form>
                              <Form.Label htmlFor="SelectCategory">
                                상품카테고리
                              </Form.Label>

                              <Form.Select
                                className="mb-4"
                                id="SelectCategory"
                                aria-label="Default select example"
                                onChange={selectCategoryHandler}
                                value={categoryId}
                                style={{ width: '18rem' }}
                              >
                                <option>카테고리를 선택해주세요</option>
                                {categories.map((category) => {
                                  return (
                                    <option
                                      key={category._id}
                                      value={category._id}
                                    >
                                      {category.title}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                            </Form>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <Container>
                        <Row
                          xs={3}
                          className="justify-content-md-center align-top align-left"
                        >
                          {products.map((product) => {
                            return (
                              <ProductCard
                                key={product._id}
                                product={product}
                              />
                            );
                          })}
                        </Row>
                      </Container>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default CategoryProducts;
