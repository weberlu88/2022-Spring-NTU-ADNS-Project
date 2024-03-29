import React from 'react';
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import { Layout } from 'antd';
import { Image } from 'antd';
import { Breadcrumb } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
const { Header, Content, Footer, Sider } = Layout;

import img from '../images/miko_ride.jpg';

// import { apiGetCookieTest } from '../requests'

class PersonalProfile extends React.Component {

  // componentDidMount() {
  //   apiGetCookieTest()
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(error => {
  //       console.log(error.data.message);
  //     });
  // }

  render() {
    return (
      <div style={{ padding: "1rem 0" }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Site</Breadcrumb.Item>
          <Breadcrumb.Item>About</Breadcrumb.Item>
        </Breadcrumb>
        <br />
        <Card title="All about me" style={{ width: '50%' }}>
          <Row gutter={10}>
            <Col span={6}>
              <Image src={img} />
            </Col>
            <Col span={18}>
              <Title level={3}>呂晟維</Title>
              <p>大家好! 我來自台大資管所的ANTSlab，大學畢業於中央資管，雖然大家都說孫媽很恐怖，但偷偷告訴你，其實孫媽不恐怖而是超~級~恐~怖~。還有，孫媽她上碩班選修課的時候好親切，有種反差萌的感覺，想到不吧。</p>
            </Col>
          </Row>
        </Card>
      </div>

    );
  }
}

export default PersonalProfile