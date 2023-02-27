import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Elice Project made by 6team</span>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />이 페이지에 대하여
              </h6>
              <p>
                이 페이지는 엘리스에서 진행한 모의 프로젝트로, 쇼핑몰의 기능을
                가지고 있으며 실제 구매는 되지 않으니 편하게 구경하세요.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Frontend</h6>
              <p>
                <a href="#!" className="text-reset">
                  김소현
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  임시현
                </a>
              </p>
            </MDBCol>
            <MDBCol md="1" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Backend</h6>
              <p>
                <a href="#!" className="text-reset">
                  이정진
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  김성연
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  이승은
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">구현 기술</h6>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                info@example.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      >
        © 2023 Copyright-
        <a className="text-reset" href="#">
          LJJ style
        </a>
      </div>
    </MDBFooter>
  );
}
