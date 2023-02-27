import React from 'react';
import logo from './cryve-trans.png';
import logoText from './cryve-text.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top justify-content-between">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} className="App-logo img-fluid" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
          </Nav>
          <img src={logoText} className="img-fluid" width="200px" alt="logo" />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;