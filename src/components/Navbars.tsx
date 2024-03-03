import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Navbars = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Weather</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              href="/"
              className={
                location.pathname === "/" || location.pathname.includes("/forecast")
                  ? "active"
                  : ""
              }
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/favorites"
              className={location.pathname === "/favorites" ? "active" : ""}
            >
              Favorites
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
