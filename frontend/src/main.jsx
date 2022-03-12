import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import './index.css'
import SiderLayout from './components/SiderLayout'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SiderLayout />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
