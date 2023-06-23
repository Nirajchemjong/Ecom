import { signOut } from "firebase/auth";
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { auth } from "../../config/firebase-config";
import { useDispatch } from "react-redux";
import { setUsers } from "../../pages/registration-login/UserSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { ImExit } from "react-icons/im";
import { TbLogin, TbLogout } from "react-icons/tb";

const Header = () => {
  const dispatch = useDispatch();
  const handleOnLogout = () => {
    signOut(auth).then(() => {
      //reset user state in redux
      dispatch(setUsers({}));
      toast.success("you've been logged out! ");
    });
  };
  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='md'
      //   className='bg-body-tertiary'
    >
      <Container>
        <Navbar.Brand href='#home'>Niraj Ecom</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Link
              className='nav-link'
              to='/dashboard'
              title='Dashboard'
            >
              <AiFillDashboard />
            </Link>
            <Link
              className='nav-link'
              to='#!'
              title='Logout'
            >
              <ImExit />
            </Link>
            <Link
              className='nav-link'
              to='/'
              title='Login'
            >
              <TbLogin />
            </Link>
            <Link
              className='nav-link'
              to='/'
              title='logout'
              onClick={handleOnLogout}
            >
              <TbLogout />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
