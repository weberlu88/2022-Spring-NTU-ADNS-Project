import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import './index.css'
import App from './App'
import SiderLayout from './components/SiderLayout'

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <SiderLayout />
  </React.StrictMode>,
  document.getElementById('root')
)
