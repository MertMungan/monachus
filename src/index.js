/* eslint-disable */
// ** React Imports
import { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'

// ** Redux Imports
import { Provider } from 'react-redux'
import { store } from './redux/storeConfig/store'
import { toast } from 'react-toastify'
// ** Intl, CASL & ThemeColors Context
import ability from './configs/acl/ability'
import { ToastContainer } from 'react-toastify'
import { AbilityContext } from './utility/context/Can'
import { ThemeContext } from './utility/context/ThemeColors'
import { IntlProviderWrapper } from './utility/context/Internationalization'

// ** Spinner (Splash Screen)
import Spinner from './@core/components/spinner/Fallback-spinner'

// ** Ripple Button
import './@core/components/ripple-button'

// ** Fake Database
import './@fake-db'

// ** PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx.min'

// ** React Perfect Scrollbar
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** React Toastify
import '@styles/react/libs/toastify/toastify.scss'

// ** Core styles
import './@core/assets/fonts/feather/iconfont.css'
import './@core/scss/core.scss'
import './assets/scss/style.scss'

//.**. Query Builder Style
import 'react-awesome-query-builder/lib/css/styles.css'

// ** Service Worker
import * as serviceWorker from './serviceWorker'

// ** Keycloak
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './Keycloak'

// ** Lazy load app
const LazyApp = lazy(() => import('./App'))

const eventLogger = (event, error) => {
  // console.log('event', event)
  // console.log('error', error)
}
const tokenLogger = (tokens) => {
  localStorage.setItem(
    'userAccessToken',
    JSON.stringify({ userAccessToken: tokens.token })
  )
}

ReactDOM.render(
  <ReactKeycloakProvider
    onTokenExpired={(t) => {
      console.log('onTokenExpired', t)
    }}
    authClient={keycloak}
    onEvent={eventLogger}
    onTokens={tokenLogger}
    initOptions={{
      pkceMethod: 'S256',

      // must match to the configured value in keycloak
      redirectUri: 'http://localhost:4000',
      // this will solved the error
      checkLoginIframe: false
    }}
  >
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <AbilityContext.Provider value={ability}>
          <ThemeContext>
            <IntlProviderWrapper>
              <LazyApp />
              <ToastContainer newestOnTop />
            </IntlProviderWrapper>
          </ThemeContext>
        </AbilityContext.Provider>
      </Suspense>
    </Provider>
  </ReactKeycloakProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
/* eslint-disable */
