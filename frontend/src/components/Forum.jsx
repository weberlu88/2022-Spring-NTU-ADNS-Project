import { useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
const { TextArea } = Input;

export default function Formun() {
  // https://ant.design/components/input/#header
  // state = {
  //   value: '',
  // };

  // onChange = ({ target: { value } }) => {
  //   this.setState({ value });
  // };

  const [inputUsername, setInputUsername] = useState("");
  const [inputComment, setInputComment] = useState("");

  const onSubmit = ({ target: { value } }) => {
    this.setState({ value });
  };

  return (

    <main style={{ padding: "1rem 0" }}>
      <h2>Forum</h2>

      <div style={{ width: '40%' }}>
        <Row>
          <Col span={6} style={{ fontWeight: 'bold' }}>暱稱</Col>
          <Col span={18}><Input placeholder="匿名使用者" /></Col>
        </Row>
        <Row>
          <Col span={6} style={{ fontWeight: 'bold' }}>留言</Col>
          <Col span={18}>
            <TextArea
              // value={value}
              // onChange={this.onChange}
              placeholder="Leave some messages"
              autoSize={{ minRows: 2, maxRows: 3 }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={3} offset={21}>
            <Button id="btn_comment" type="primary" style={{ float: 'right' }}>Send</Button>
          </Col>
        </Row>

        {/* 留言顯示區 */}
        <div>

        </div>
      </div>
    </main >
  );
}