import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  "realm": "Monachus",
    "auth-server-url": "https://apps.belgesakla.com/auth/",
    "ssl-required": "external",
    "resource": "Monachus",
    "public-client": true,
    "confidential-port": 0,
    "url": 'https://apps.belgesakla.com/auth/',
    "clientId": 'auth-monachus',
    "enable-cors": true
});
// keycloak.init({
//     flow: 'hybrid'
// })
export default keycloak;

