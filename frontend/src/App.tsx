import Keycloak from 'keycloak-js';
import Button from 'react-bootstrap/Button';

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
      <div>
        <h1>React App</h1>
      </div>
      
      <div>
        <Button variant="success" onClick={() => { kc.logout({
          redirectUri: 'http://localhost:3000/'
        }) }}> Logout </Button>
      </div>
    </>
  );
};

export default App;