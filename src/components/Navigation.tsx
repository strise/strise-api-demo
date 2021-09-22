import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

export const Navigation = () => {
  const location = useLocation()

  return (
    <Menu selectedKeys={[location.pathname]} mode='horizontal' style={{ minWidth: 500, margin: '0 8px' }}>
      <Menu.Item key='/'>
        <Link to='/'>
          Events
        </Link>
      </Menu.Item>
      <Menu.Item key='/companies'>
        <Link to='/companies'>
          Companies
        </Link>
      </Menu.Item>
      <Menu.Item key='/users'>
        <Link to='/users'>
          Users
        </Link>
      </Menu.Item>
    </Menu>
  )
}
