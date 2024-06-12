import { useState } from 'react';
import Keycloak from 'keycloak-js';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

let initOptions = {
  url: 'http://localhost:8080/',
  realm: 'myrealm',
  clientId: 'react-client',
}

let kc = new Keycloak(initOptions);

kc.init({
  onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
  checkLoginIframe: true,
  pkceMethod: 'S256'
}).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    /* Remove below logs if you are using this on production */
    console.info("Authenticated");
    console.log('auth', auth)
    console.log('Keycloak', kc)
    console.log('Access Token', kc.token)

    kc.onTokenExpired = () => {
      console.log('token expired')
    }
  }
}, () => {
  /* Notify the user if necessary */
  console.error("Authentication Failed");
});

function App() {

  const [infoMessage, setInfoMessage] = useState('');

  return (
    <>
      <div>
        <h1>React App</h1>
      </div>
      
      <div>
        <Button onClick={() => {setInfoMessage(
          kc.authenticated ? 'Authenticated: TRUE' : 'Authenticated: FALSE'
        ); }}/>
        <Button onClick={() => { kc.login() }}/>
        <Button onClick={() => { kc.logout({
          redirectUri: 'http://localhost:3000/'
        }) }}/>
      </div>

      <div>
        <Card>
          <p style={{ wordBreak: 'break-all' }} id='infoPanel'>
            {infoMessage}
          </p>
        </Card>
      </div>
    </>
  );
};

export default App;