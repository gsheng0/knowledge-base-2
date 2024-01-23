import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../context/AuthContext';

export const NavBar = () => {
  const { isAuthenticated, signIn, signOut, userInfo } = useAuth();

  const handleSignOut = () => {
    // Call signOut and redirect to the home page
    signOut();
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/articles">Articles</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
          <Nav.Link href="/write">Write</Nav.Link>
          {
            isAuthenticated ? (
                <Nav.Link href="/myArticles">My Articles</Nav.Link>
            ):(<></>)
          }
        </Nav>
        {isAuthenticated ? (
          // If authenticated, show "Sign Out" option
          <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
        ) : (
          // If not authenticated, show "Sign In" and "Sign Up" options
          <>
            <Nav.Link href="/sign-in">Sign In</Nav.Link>
            <Nav.Link href="/sign-up">Sign Up</Nav.Link>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
