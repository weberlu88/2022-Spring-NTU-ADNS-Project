import { useState } from 'react';
import ReactDOM from 'react-dom'
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

  // https://zh-hant.reactjs.org/docs/forms.html
  // https://zh-hant.reactjs.org/docs/handling-events.html

  const [inputUsername, setInputUsername] = useState("");
  const [inputComment, setInputComment] = useState("");
  const commentLists = []

  function handleSubmit(e) {
    // 取值
    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').textContent
    console.log('u: ', username)
    console.log('c: ', comment)
    setInputUsername(username)
    setInputComment(comment)
    console.log('u: ', inputUsername)
    console.log('c: ', inputComment)
    // 新增留言到陣列中
    commentLists.push(username + ": " + comment)
    console.log('all: ', commentLists)
    // 重新渲染留言 Element
    let lists = commentLists.map(function (item, idx) {
      return <li key={idx}>{item}</li>
    });
    ReactDOM.render(
      <ul>
        {lists}
      </ul>,
      document.getElementById('comment_list')
    );
  }

  return (

    <main style={{ padding: "1rem 0" }}>
      <h2>Forum</h2>

      <div style={{ width: '40%' }}>
        <Row>
          <Col span={6} style={{ fontWeight: 'bold' }}>暱稱</Col>
          <Col span={18}><Input id="username" placeholder="匿名使用者" /></Col>
        </Row>
        <Row>
          <Col span={6} style={{ fontWeight: 'bold' }}>留言</Col>
          <Col span={18}>
            <TextArea
              id="comment"
              // value={value}
              // onChange={setInputComment}
              placeholder="Leave some messages"
              autoSize={{ minRows: 2, maxRows: 3 }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={3} offset={21}>
            <Button id="btn_comment" type="primary" style={{ float: 'right' }} onClick={handleSubmit}>Send</Button>
          </Col>
        </Row>

        {/* 留言顯示區 */}
        <div id="comment_list">

        </div>
      </div>
    </main >
  );
}