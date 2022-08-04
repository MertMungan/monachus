// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NotificationDropdown from './NotificationDropdown'

// ** Custom Components
import NavbarBookmarks from './NavbarBookmarks'

// ** Third Party Components
import { Sun, Moon } from 'react-feather'
import { NavItem, NavLink } from 'reactstrap'

// KEYCLOACK
import { useKeycloak } from '@react-keycloak/web'

// REDUX
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  getUserWithClientRoles,
  fetchKeycloakUsers,
  fetchKeycloakUsersClientRoles,
} from "../../../../redux/actions/keycloakUsers";
import { getUserAccount } from "../../../../redux/actions/userAccountInfo"
import { fetchMetaDataRules } from "../../../../redux/actions/metaDataRules"
import { fetchMetaDataEvents } from "../../../../redux/actions/metaDataEvents"
import { fetchRuleCategory } from "../../../../redux/actions/ruleCategory"

const ThemeNavbar = (props) => {
  // ** Props
  const {
    skin,
    setSkin,
    setMenuVisibility,
    getUserWithClientRoles,
    fetchKeycloakUsers,
    fetchKeycloakUsersClientRoles,
    getUserAccount,
    fetchMetaDataRules,
    fetchMetaDataEvents,
    fetchRuleCategory
  } = props
  const { keycloak, initialized } = useKeycloak()
  const [userData, setUserData] = useState([])
  const [userProfile, setUserProfile] = useState([])

  // keycloak.loadUserInfo().then((item) => console.log('loadUserInfo', item))
  // keycloak
  //   .loadUserProfile()
  //   .then((item) => console.log('loadUserProfile', item))
  // keycloak

  const test = JSON.parse(
    localStorage.getItem('userAccessToken')
  )?.userAccessToken
  const userRealm = JSON.parse(localStorage.getItem('userRealm'))?.userRealm
  useEffect(() => {
    if (!test && !keycloak.refreshToken) {
      // KEYCLOAK LOGİN REFRESHTEN SONRA LOOP A SOKUYOR PROGRAMI BURADA
      keycloak.login()
    } else if (!keycloak?.authenticated && keycloak.refreshToken) {
      keycloak.updateToken()
    }

    if (keycloak?.authenticated) {
      const loadUserInfo = async () => {
        const userInfo = await keycloak.loadUserInfo()
        setUserData(userInfo)
      }

      const loadUserProfile = async () => {
        const userProfile = await keycloak.loadUserProfile()
        setUserProfile(userProfile)
      }
      loadUserInfo()
      loadUserProfile()
    }
  }, [keycloak])

  useEffect(() => {
    if (userRealm) {
    getUserWithClientRoles();
    fetchKeycloakUsers();
    fetchKeycloakUsersClientRoles();
    getUserAccount();
  }
  }, [userRealm]);

  useEffect(() => {
    fetchMetaDataRules();
    fetchMetaDataEvents();
    fetchRuleCategory();
  }, [])
  

  useEffect(() => {
    if (userData && userProfile) {
      // console.log(keycloak)
      localStorage.setItem(
        'userData',
        JSON.stringify({
          username: keycloak.profile?.firstName,
          userLastName: keycloak.profile?.lastName,
          role: 'client',
          ability: [
            {
              action: 'manage',
              subject: 'all'
            }
          ]
        })
      )
      localStorage.setItem(
        'userId',
        JSON.stringify({ userId: keycloak.subject })
      )
      localStorage.setItem(
        'userRealm',
        JSON.stringify({ userRealm: keycloak.realm })
      )
      localStorage.setItem(
        'userUserName',
        JSON.stringify({ userName: keycloak.profile?.username })
      )
      localStorage.setItem(
        'userClientId',
        JSON.stringify({ userName: keycloak.clientId })
      )
    }
  }, [userData, userProfile])

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
        <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
      </div>
      <ul className='nav navbar-nav align-items-center ml-auto'>
        <IntlDropdown />
        <NavItem className='d-none d-lg-block'>
          <NavLink className='nav-link-style'>
            <ThemeToggler />
          </NavLink>
        </NavItem>
        {/*<NavbarSearch />*/}
        {/* <CartDropdown /> */}
        <NotificationDropdown />
        <UserDropdown />
      </ul>
    </Fragment>
  )
}

ThemeNavbar.propTypes = {
  skin: PropTypes.string,
  setSkin: PropTypes.func,
  setMenuVisibility: PropTypes.func,
  keycloak: PropTypes.object,
  initialized: PropTypes.bool,
  getUserWithClientRoles: PropTypes.func,
  fetchKeycloakUsers: PropTypes.func,
  fetchKeycloakUsersClientRoles: PropTypes.func,
  getUserAccount: PropTypes.func,
  fetchRuleCategory:PropTypes.func,
  fetchMetaDataEvents:PropTypes.func,
  fetchMetaDataRules:PropTypes.func,
}

const mapStateToProps = (state) => {
  return {
    userAccountData: state.userAccountReducer
  }
}

export default connect(null, {
  getUserWithClientRoles,
  fetchKeycloakUsers,
  fetchKeycloakUsersClientRoles,
  getUserAccount,
  fetchMetaDataRules,
  fetchMetaDataEvents,
  fetchRuleCategory,
})(ThemeNavbar);
// export default ThemeNavbar
