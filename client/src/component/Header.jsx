import { Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/admin">관리자모드</Nav.Link>
          <Nav.Link href="/">1.Home(메인페이지)</Nav.Link>
          <Nav.Link href="/login">2.로그인</Nav.Link>
          <Nav.Link href="/register">3.회원가입</Nav.Link>
          <Nav.Link href="/user">4.사용자정보</Nav.Link>
          <Nav.Link href="/register">5.비밀번호변경페이지</Nav.Link>
          <Nav.Link href="/register">6.회원탈퇴페이지</Nav.Link>
          <Nav.Link href="/admin/categories">7.관리자카테고리</Nav.Link>
          <Nav.Link href="/admin/products">8.관리자상품관리</Nav.Link>
          <Nav.Link href="/admin/orders">
            9.
            <br />
            관리자
            <br />
            주문관리
          </Nav.Link>
          <Nav.Link href="/register">10.상품추가/수정페이지</Nav.Link>
          <Nav.Link href="/register">11.상품상세</Nav.Link>
          <Nav.Link href="/product/categoryName">
            12.카테고리별상품목록
          </Nav.Link>
          <Nav.Link href="/cart">13.장바구니페이지</Nav.Link>
          <Nav.Link href="/register">14.주문페이지</Nav.Link>
          <Nav.Link href="/register">15.주문완료페이지</Nav.Link>
          <Nav.Link href="/orders/list">
            16.
            <br />
            주문목록
            <br />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
