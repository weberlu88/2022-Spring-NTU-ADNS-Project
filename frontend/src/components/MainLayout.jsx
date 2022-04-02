import React from 'react'
import { Layout, Menu } from 'antd';
import {
  InfoOutlined,
  WechatFilled,
  LoginOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;
import { Tag } from 'antd';
import PersonalProfile from './PersonalProfile'
import Forum from './Forum'
import LoginRegisterForm from './Login';
import { Card } from 'antd';
import { Row, Col } from 'antd';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { apiGetVisitCount } from '../requests'

const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      authenticated: false, // 是否登入的 flag
      idUser: undefined,    // 若已登入則儲存用戶id，若訪客則undefined
      visitCount: 1
    };
    this.getVisitCount = this.getVisitCount.bind(this);
  }

  async getVisitCount() {
    try {
      let res = await apiGetVisitCount()
      // console.log(res.data.visitCount)
      this.setState({ visitCount: res.data.visitCount })
    } catch (error) {
      console.log(error)
    }
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount() {
    this.getVisitCount()
  }

  render() {
    const { collapsed } = this.state;

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <Title style={{ color: 'white', textAlign: 'center', width: '100%', justifyContent: 'center' }}>
            Hack.Me
          </Title>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<InfoOutlined />}>
              {/* 關於我 */}
              <Link to="/">關於我</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<WechatFilled />}>
              {/* 留言板 */}
              <Link to="/forum">留言板</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<LoginOutlined />}>
              <Link to="/loginRegister">註冊/登入</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Tag icon={<TwitterOutlined />} color="#55acee">
                造訪人數: {this.state.visitCount}
              </Tag>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>

            {/* 主畫面區域，使用Router切換元件 */}
            <Routes>
              <Route path="/" element={<PersonalProfile />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/loginRegister" element={<LoginRegisterForm />} />
            </Routes>

          </Content>
          <Footer style={{ textAlign: 'center' }}>Weber Lu ©2022 from NTUMIS</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout