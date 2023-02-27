import { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Button, NavDropdown } from 'react-bootstrap';
import { verifyTokken } from '../../util/verify';
import './NavBar.css';

function NavBar() {
  const [auth, setAuth] = useState('NOTUSER');
  useEffect(() => {
    verifyTokken().then(setAuth);
  }, []);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    setAuth('NOTUSER');
  };

  return (
    <header>
      <div>
        <Navbar fixed="top" bg="light" style={{ variant: 'dark' }}>
          <Container>
            <Nav className="me-auto">
              <Navbar.Brand href="/main" className="main">
                육쾌상쾌
              </Navbar.Brand>
              <Nav.Link href="/main">Home</Nav.Link>

              <NavDropdown title="Category" id="basic-nav-dropdown">
                <NavDropdown.Item href="/fruit">과일</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/vegatable">야채</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/fast">냉동식품</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/diet">다이어트</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              <Nav.Link href="/user-withdrawal" style={{ color: '#000000' }}>
                장바구니
              </Nav.Link>

              {auth !== 'NOTUSER' ? (
                <Button onClick={handleLogout} variant="outline-dark">
                  로그아웃
                </Button>
              ) : (
                <Button variant="outline-dark">
                  <Nav.Link href="/login">로그인</Nav.Link>
                </Button>
              )}
            </Nav>
          </Container>
        </Navbar>
      </div>
    </header>
  );
}

export default NavBar;
