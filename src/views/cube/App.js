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
import { useSkin } from '@hooks/useSkin'

const API_URL = 'http://164.90.232.177:4000'
const CUBEJS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTgxMzkwMjIsImV4cCI6MTY1ODIyNTQyMn0.VWQ44A3EFhmuqz0Ql1vunGIx5INtzWELQw7wo_zPodM'
const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: `${API_URL}/cubejs-api/v1`
})

const AppLayout = ({ children }) => {
  const [skin, setSkin] = useSkin()

  return (
    <Layout
      style={{
        height: '100%',
        backgroundColor: skin === 'dark' ? '#161d31' : '#fff'
      }}
    >
      <Header />
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}

const App = ({ children }) => (
  <CubeProvider cubejsApi={cubejsApi}>
    <ApolloProvider client={client}>
      <AppLayout>{children}</AppLayout>
    </ApolloProvider>
  </CubeProvider>
)

export default App
