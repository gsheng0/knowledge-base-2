import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../index.css';

  
  export const NavBar = () => {
    return (
      <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/sign-in">Sign In</Nav.Link>
          <Nav.Link href="/sign-up">Sign Up</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    );
  };


  export default NavBar;
  
