import React from 'react'
import { Breadcrumb } from 'antd';
import { Row, Col, Input, Button, Form, Card } from 'antd';
import { apiLogin, apiRegister } from '../requests'
import RegisterForm from './Register'
import ErrorMsg from './ErrorMsg';

class LoginRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginTextInput: { username: '', password: '' },
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postLogin = this.postLogin.bind(this);
  }

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  handleChange(event) {
    const key = event.target.name
    const val = event.target.value
    // console.log(key, val)
    this.setState({
      loginTextInput: {
        ...this.state.loginTextInput,
        [key]: val,
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postLogin(this.state.loginTextInput);
  }

  async postLogin(requestBody) {
    try {
      let res = await apiLogin(requestBody)
      // this.state.authenticated = true
      // console.log(res.data.username)
      this.setState({ errorMessage: '' })
      alert(`login sucuess! ${res.data.username}.`)
      // record access_token & idUser & name
      this.props.onLogin(
        res.data.idUser,
        res.data.username,
        res.data.access_token)
    } catch (error) {
      // console.log("error: ", error.data.message)
      this.setState({ errorMessage: error.data.message })
    }
  }

  render() {
    return (
      <div style={{ padding: "1rem 0" }}>
        {/* 登入 */}
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Site</Breadcrumb.Item>
          <Breadcrumb.Item>Login</Breadcrumb.Item>
        </Breadcrumb>
        <ErrorMsg msg={this.state.errorMessage} />
        <form onSubmit={this.handleSubmit}>
          <Row>
            <label>
              使用者名稱:
              <Input name="username" value={this.state.loginTextInput.username}
                onChange={this.handleChange} />
            </label>
          </Row>
          <Row>
            <label>
              請輸入密碼:
              <Input name="password" value={this.state.loginTextInput.password}
                onChange={this.handleChange} />
            </label>
          </Row>

          <input type="submit" value="Submit" />
        </form>

        {/* 註冊 */}
        <br />
        <RegisterForm />

        <br />
        <Card title="規則" style={{ width: '700px' }}>
          <p>
            (1) 姓名、密碼最長20字元，不可為空 <br />
            (2) 自我介紹最長120字元，允許空值 <br />
            (3) 圖片僅接受小於1MB的圖片，不附圖將使用預設頭貼，副檔名限jpeg、png
          </p>
        </Card>
      </div >
    );
  }
}

export default LoginRegisterForm;