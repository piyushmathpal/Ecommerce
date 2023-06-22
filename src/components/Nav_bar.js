import React,{useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth0 } from "@auth0/auth0-react";
import {auth} from '../config/firebase'
import { signOut } from "firebase/auth";



const Nav_bar = () => {
  // const { loginWithRedirect,logout,user, isAuthenticated, isLoading } = useAuth0();
  const [user,setUser]=useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((user1) => {
      if (user1) {
        setUser(user1)
        console.log(user)
      }
      console.log(user) 
    });
  }, []);
  console.log(user);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="justify-content-between align-self-center"
    >
      <Container>
        <Link className="navbar-brand flex-row-reverse" to="/">
          E-Shop
        </Link>

         {/* {
            user &&(<Link className="nav-link text-white float-right"  >
            Welcome {user.name}
          </Link>)
          }   */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="flex-row-reverse"
        >
          <Nav className="align-self-center">
         
            {user ? (
              <>
              
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>

                <Nav.Link
                  onClick={() => {
                      signOut(auth);
                      setUser(null);
                    }
                  }
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link> 
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
                
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Nav_bar;
