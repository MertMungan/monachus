// ** React Imports
import { Fragment, useEffect } from "react";

// ** Dropdowns Imports
import IntlDropdown from "./IntlDropdown";
import CartDropdown from "./CartDropdown";
import UserDropdown from "./UserDropdown";
import NotificationDropdown from "./NotificationDropdown";

// ** Custom Components
import NavbarBookmarks from "./NavbarBookmarks";

// ** Third Party Components
import { Sun, Moon } from "react-feather";
import { NavItem, NavLink } from "reactstrap";

// KEYCLOACK
import { useKeycloak } from "@react-keycloak/web";

// REDUX
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getUserWithClientRoles,
  fetchKeycloakUsers,
  fetchKeycloakUsersClientRoles,
} from "../../../../redux/actions/keycloakUsers";

const ThemeNavbar = (props) => {
  // ** Props
  const {
    skin,
    setSkin,
    setMenuVisibility,
    getUserWithClientRoles,
    fetchKeycloakUsers,
    fetchKeycloakUsersClientRoles,
  } = props;
  const { keycloak, initialized } = useKeycloak();

  // keycloak.loadUserInfo().then((item) => console.log('loadUserInfo', item))
  // keycloak
  //   .loadUserProfile()
  //   .then((item) => console.log('loadUserProfile', item))
  // keycloak

  useEffect(() => {
    if (!keycloak?.authenticated && !keycloak.refreshToken) {
      keycloak.login();
    } else if (!keycloak?.authenticated && keycloak.refreshToken) {
      keycloak.updateToken();
    }

    if (keycloak?.authenticated) {
      const loadUserInfo = async () => {
        const userInfo = await keycloak.loadUserInfo();
        console.log("loadUserInfo", userInfo);
      };

      const loadUserProfile = async () => {
        const userProfile = await keycloak.loadUserProfile();
        console.log("loadUserProfile", userProfile);
      };

      loadUserInfo();
      loadUserProfile();
    }
  }, [keycloak]);

  useEffect(() => {
    getUserWithClientRoles();
    fetchKeycloakUsers();
    fetchKeycloakUsersClientRoles();
  }, []);

  console.log("keycloak", keycloak);

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return <Sun className="ficon" onClick={() => setSkin("light")} />;
    } else {
      return <Moon className="ficon" onClick={() => setSkin("dark")} />;
    }
  };

  return (
    <Fragment>
      <div className="bookmark-wrapper d-flex align-items-center">
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <ul className="nav navbar-nav align-items-center ml-auto">
        <IntlDropdown />
        <NavItem className="d-none d-lg-block">
          <NavLink className="nav-link-style">
            <ThemeToggler />
          </NavLink>
        </NavItem>
        {/*<NavbarSearch />*/}
        <CartDropdown />
        <NotificationDropdown />
        <UserDropdown />
      </ul>
    </Fragment>
  );
};

ThemeNavbar.propTypes = {
  skin: PropTypes.string,
  setSkin: PropTypes.func,
  setMenuVisibility: PropTypes.func,
  keycloak: PropTypes.object,
  initialized: PropTypes.bool,
  getUserWithClientRoles: PropTypes.func,
  fetchKeycloakUsers: PropTypes.func,
  fetchKeycloakUsersClientRoles: PropTypes.func,
};

export default connect(null, {
  getUserWithClientRoles,
  fetchKeycloakUsers,
  fetchKeycloakUsersClientRoles,
})(ThemeNavbar);
// export default ThemeNavbar
