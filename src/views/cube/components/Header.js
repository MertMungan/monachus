import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { useSkin } from '@hooks/useSkin'

const Header = ({ location }) => {
  const [skin, setSkin] = useSkin()
  return (
    <Layout.Header
      style={{
        padding: '0 32px',
        backgroundColor: skin === 'dark' ? '#161d31' : '#fff'
      }}
    >
      <div
        style={{
          float: 'left'
        }}
      >
        <h2
          style={{
            color: skin === 'dark' ? '#fff' : '#161d31',
            margin: 0,
            marginRight: '1em',
            display: 'inline',
            width: 100,
            lineHeight: '54px'
          }}
        >
          My Dashboard
        </h2>
      </div>
      <Menu
        theme={skin}
        mode='horizontal'
        // selectedKeys={[location.pathname]}
        style={{
          lineHeight: '64px'
        }}
      >
        <Menu.Item key='/explore'>
          <Link to='/monachus/explore'>Explore</Link>
        </Menu.Item>
        <Menu.Item key='/cube'>
          <Link to='/monachus/cube'>Dashboard</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  )
}

export default Header
