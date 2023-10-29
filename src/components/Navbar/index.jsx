import { Link } from 'react-router-dom';
import { userAtom } from '../../stores/userAtom'
import { useAtom } from 'jotai';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutButton from '../Logout';
import './style.css';

const NavBar = () => {
  const [userInfo] = useAtom(userAtom);

  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="nav-title">
          Wordle
        </Navbar.Brand>
        <Nav className="links">
          {userInfo.isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/statistics" className="nav-links">
                Statistics
              </Nav.Link>
              <Nav.Link as={Link} to="/parameters" className="nav-links">
                Parameters
              </Nav.Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/signup" className="nav-links">
                Sign up
              </Nav.Link>
              <Nav.Link as={Link} to="/signin" className="nav-links">
                Sign in
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
