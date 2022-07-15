import './body.css'
import 'antd/dist/antd.css'
import React from 'react'
import '@ant-design/compatible'
import { ApolloProvider } from '@apollo/react-hooks'
import { Layout } from 'antd'
import cubejs from '@cubejs-client/core'
import { CubeProvider } from '@cubejs-client/react'
import client from './graphql/client'
import Header from './components/Header'
const API_URL = 'http://localhost:4002'
const CUBEJS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTY1ODc2ODEsImV4cCI6MTY1NjY3NDA4MX0.M7CmfH_fUaMZgGOZ9WlSKdms3FxiCXpACMINv2nQQpY'
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`
})

const AppLayout = ({ children }) => (
  <Layout
    style={{
      height: '100%',
      backgroundColor: '#10163a'
    }}
  >
    <Header />
    <Layout.Content>{children}</Layout.Content>
  </Layout>
)

const App = ({ children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <ApolloProvider client={client}>
      <AppLayout>{children}</AppLayout>
    </ApolloProvider>
  </CubeProvider>
)

export default App
