import React from 'react'
import { Breadcrumb } from 'antd';
import { Row, Col, Input, Button, Form } from 'antd';
import { apiLogin, apiRegister } from '../requests'
import ErrorMsg from './ErrorMsg'

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      registerTextInput: { username: '', password: '', description: '' },
      errorMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.postRegister = this.postRegister.bind(this);
  }

  /** @type {React.ChangeEventHandler<HTMLInputElement>} */
  handleChange(event) {
    const key = event.target.name
    const val = event.target.value
    // console.log(key, val)
    this.setState({
      registerTextInput: {
        ...this.state.registerTextInput,
        [key]: val,
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postRegister(this.state.registerTextInput);
  }

  async postRegister(requestBody) {
    try {
      let successInfo = (await apiRegister(requestBody)).data.message
      // console.log(successInfo)
      this.setState({ errorMessage: '' })
      alert(`${successInfo}`)
    } catch (error) {
      // alert("error: ", error.data.message)
      // console.log(`error type: ${typeof error}`)
      this.setState({ errorMessage: error.data.message })
    }
  }

  render() {
    return (
      <div style={{ padding: "1rem 0" }}>

        {/* 註冊 */}
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Site</Breadcrumb.Item>
          <Breadcrumb.Item>Register</Breadcrumb.Item>
        </Breadcrumb>
        <ErrorMsg msg={this.state.errorMessage} />
        <form onSubmit={this.handleSubmit}>
          <Row>
            <label>
              使用者名稱:
              <Input name="username" value={this.state.registerTextInput.username}
                onChange={this.handleChange} />
            </label>
          </Row>
          <Row>
            <label>
              請輸入密碼:
              <Input name="password" value={this.state.registerTextInput.password}
                onChange={this.handleChange} />
            </label>
          </Row>
          <Row>
            <label>
              寫點自介吧:
              <Input name="description" value={this.state.registerTextInput.description}
                onChange={this.handleChange} />
            </label>

          </Row>

          <input type="submit" value="Submit" />
        </form>
      </div >
    );
  }
}

export default RegisterForm;