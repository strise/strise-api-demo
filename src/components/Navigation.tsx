import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

export const Navigation = () => {
  const location = useLocation()

  return (
    <Menu selectedKeys={[location.pathname]} mode='horizontal' style={{ width: '100%', margin: '0 8px' }}>
      <Menu.Item key='/graphql-subscriptions-example/events'>
        <Link to='/graphql-subscriptions-example/events'>
          Events
        </Link>
      </Menu.Item>
      <Menu.Item key='/graphql-subscriptions-example/companies'>
        <Link to='/graphql-subscriptions-example/companies'>
          Companies
        </Link>
      </Menu.Item>
      <Menu.Item key='/graphql-subscriptions-example/users'>
        <Link to='/graphql-subscriptions-example/users'>
          Users
        </Link>
      </Menu.Item>
    </Menu>
  )
}
