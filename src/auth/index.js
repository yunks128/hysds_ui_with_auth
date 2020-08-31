import Keycloak from "keycloak-js";

const keycloak = Keycloak({
  realm: "hysds",
  clientId: "hysds_ui",
  url: "http://localhost:8080/auth/",
});

export const handleAuth = (authAction) => {
  /**
   * function to handle authentication and set the redux states when confirmed
   * takes in redux action as input
   */
  keycloak.init({ onLoad: "login-required" }).then((auth) => {
    console.log(keycloak);
    authAction({
      authenticated: auth,
      authInfo: keycloak,
      token: keycloak.token,
    });
  });
};

export const handleLogout = (logoutAction) => {
  /**
   * redux action as input
   */
  keycloak.logout();
  logoutAction();
};
