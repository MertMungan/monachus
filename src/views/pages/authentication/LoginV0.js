/* eslint-disable */
import React, { useState, useCallback } from 'react'
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom'
import image from '../../../img/monachus2.png'
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  CustomInput,
  Button
} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { useKeycloak } from '@react-keycloak/web'

const Login = () => {
  const [skin, setSkin] = useState()
  const [user, setUser] = useState(null)
  const history = useHistory()

  //** KEYCLOAK */
  const { keycloak, initialized } = useKeycloak()

  const getLogin = async () => {
    const respicUser = await keycloak.loadUserProfile()
    const fetchInfo = await keycloak.loadUserInfo()
    const fetchEnd = await keycloak.endpoints.authorize()

    if (keycloak.authenticated) {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          username: keycloak.profile.firstName,
          userLastName: keycloak.profile.lastName,
          role: 'client',
          ability: [
            {
              action: 'manage',
              subject: ['dashboard', 'settings',"logs"]
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
        JSON.stringify({ userName: keycloak.profile.username })
      )
      localStorage.setItem(
        'userClientId',
        JSON.stringify({ userName: keycloak.clientId })
      )
    }

    if (keycloak.realmAccess.roles.filter((role) => role === 'Admin')[0]) {
      localStorage.setItem(
        'userData',
        JSON.stringify({
          username: keycloak.profile.firstName,
          userLastName: keycloak.profile.lastName,
          role: 'admin',
          ability: [
            {
              action: 'read',
              subject: 'TEST'
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
        JSON.stringify({ userName: keycloak.profile.username })
      )
      localStorage.setItem(
        'userClientId',
        JSON.stringify({ userName: keycloak.clientId })
      )
    }
    history.push('/monachus/analytics')
    // window.location.reload(true);
  }

  const location = useLocation()

  const currentLocationState = location.state || {
    from: { pathname: '/monachus/analytics' }
  }

  const login = useCallback(() => {
    keycloak?.login()
  }, [keycloak])

  // if (keycloak?.authenticated) {
  //   getLogin()

  //   if (localStorage.getItem('userData')) {
  //     return <Redirect to={currentLocationState} />
  //   }
  // }


  const handleLogout = (e) => {
    e.preventDefault()
    keycloak.logout()
  }
  const handleMonachus = (e) => {
    e.preventDefault()
    getLogin()
  }
  const handleRegister = (e) => {
    e.preventDefault()
    keycloak.register()
  }
  // KEYCLOAK'SUZ GİRİŞ İÇİN BURASI MERT MERT MERT
  const handleSimple = (e) => {
    e.preventDefault()
    localStorage.setItem(
      'userData',
      JSON.stringify({
        username: 'admin',
        role: 'admin',
        ability: [
          {
            action: 'manage',
            subject: 'all'
          }
        ]
      })
    )
    history.push('/monachus/analytics')
    // DAHA SONRA VUEXY LOGOSUNA BAS
  }

  //** KEYCLOAK */

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
          <img src={image} width='200px'></img>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col
          className='d-flex align-items-center auth-bg px-2 p-lg-5'
          lg='4'
          sm='12'
        >
          <Col
            className={`px-xl-2 mx-auto ${user && 'hidden'}`}
            sm='8'
            md='6'
            lg='12'
          >
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome to Monachus
            </CardTitle>
            <CardText className='mb-2'>
              Please sign-in to your account and start the adventure
            </CardText>
            <Form className='auth-login-form mt-2'>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Username
                </Label>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type='checkbox'
                  className='custom-control-Primary'
                  id='remember-me'
                  label='Remember Me'
                />
              </FormGroup>
              {!keycloak.authenticated && (
                <Button onClick={() => login()} color='primary' block>
                  Login with Keycloak
                </Button>
              )}
              {!!keycloak.authenticated && (
                <Button
                  onClick={(e) => handleLogout(e)}
                  color='secondary'
                  block
                >
                  Logout from Keycloak
                </Button>
              )}

              {!!keycloak.authenticated && (
                <Button
                  onClick={(e) => handleMonachus(e)}
                  color='primary'
                  block
                >
                  Move to Monachus
                </Button>
              )}
            </Form>
            {!keycloak.authenticated && (
              <Button onClick={(e) => handleRegister(e)} color='primary' block>
                Create an Keycloak Account
              </Button>
            )}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
/* eslint-disable */
