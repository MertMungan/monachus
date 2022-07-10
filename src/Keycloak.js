import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://apps.belgesakla.com/auth/",
  realm: "Monachus",
  clientId: "auth-monachus",
  client_secret: "fQKAROKulihDpVVt1qHrvzDt9C73bIvV",
  grant_type: "password",
  
});
// keycloak.init({
//     flow: 'hybrid'
// })
export default keycloak;
