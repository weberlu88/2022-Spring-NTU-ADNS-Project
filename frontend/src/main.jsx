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

import { apiGetVisitCount } from './requests'

try {
  const res = await apiGetVisitCount();
  console.log(res.data);
} catch(error) {
  //Log errors
  console.log(error.data);
}

apiGetVisitCount()
  .then( res => {
    console.log(res.data);
  })
  .catch( error => {
    console.log(error);
  });

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <MainLayout />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
