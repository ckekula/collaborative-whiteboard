import Keycloak from 'keycloak-js';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from './components/form/Form';
import { Route, Routes } from 'react-router-dom';
import RoomPage from './pages/roomPage/RoomPage';

const initOptions = {
  url: process.env.REACT_APP_KEYCLOAK_URL as string,
  realm: process.env.REACT_APP_KEYCLOAK_REALM as string,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID as string,
};

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    console.log('Access Token', kc.token)

    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  console.error("Authentication Failed");
});

const App = () => {
  return (
    <>
    <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Collaborative Whiteboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <div>
              <Button variant="success" onClick={() => { kc.logout({
                redirectUri: 'http://localhost:3000/'
              }) }}> Logout </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <div className="container">
      <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/:roomId" element={<RoomPage/>} />
      </Routes>
    </div>

    </>
  );
};

export default App;