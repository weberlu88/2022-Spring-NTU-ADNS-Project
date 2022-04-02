import React from "react";
import { Alert } from 'antd';

// Destructuring props in the function arguments.
const ErrorMsg = ({ msg }) => {

  return (
    msg === '' || msg === undefined ?
      <></>
      :
      <Alert message={msg} type="error" showIcon />
  );
};

export default ErrorMsg;