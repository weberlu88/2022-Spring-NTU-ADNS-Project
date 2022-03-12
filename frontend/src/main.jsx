import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import './index.css'
import MainLayout from './components/MainLayout'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
