import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import './index.css'
import MainLayout from './components/MainLayout'
import {
  HashRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <MainLayout />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
