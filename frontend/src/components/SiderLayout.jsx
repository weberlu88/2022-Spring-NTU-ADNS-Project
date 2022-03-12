import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
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
import { Card } from 'antd';
import { Row, Col } from 'antd';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

class SiderLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    let visitCount = 1;

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
              註冊/登入
            </Menu.Item>
            <Menu.Item key="4">
              <Tag icon={<TwitterOutlined />} color="#55acee">
                造訪人數: {visitCount}
              </Tag>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>

            {/* 主畫面區域，使用Router切換元件 */}
            <Routes>
              <Route path="/" element={<PersonalProfile />} />
              <Route path="/forum" element={<Forum />} />
            </Routes>

          </Content>
          <Footer style={{ textAlign: 'center' }}>Weber Lu ©2022 from NTUMIS</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderLayout