import 'antd/dist/antd.css'
import React from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
// @ts-expect-error
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
