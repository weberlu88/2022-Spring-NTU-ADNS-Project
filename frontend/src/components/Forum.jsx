import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Row, Col, Input, Button, Form } from 'antd';
import { Comment, List, Avatar } from 'antd';
import { Breadcrumb } from 'antd';
const { TextArea } = Input;
import { apiGetAllComments, apiCreateComment } from '../requests'

export default function Formun() {
  // https://ant.design/components/input/#header

  // onChange = ({ target: { value } }) => {
  //   this.setState({ value });
  // };

  // https://zh-hant.reactjs.org/docs/forms.html
  // https://zh-hant.reactjs.org/docs/handling-events.html

  // const [inputUsername, setInputUsername] = useState("");
  // const [inputComment, setInputComment] = useState("123");
  // const [form] = Form.useForm();
  const [commentList, setCommentList] = useState([]);

  /* Called when rendered (mounted) */
  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = values => {
    console.log('Received values of form: ', values);
    if (values.comment.length > 120) {
      alert('Please leave your comment! (less than 120 chars)');
      return
    }
    const requestBody = {
      idUser: 1,
      comment: values.comment
    }
    creatComment(requestBody);
  };

  const creatComment = async (requestBody) => {
    try {
      const responde = await apiCreateComment(requestBody);
      fetchData();
    } catch (error) {
      console.log("error: ", error.data.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiGetAllComments();
      console.log(response);
      setCommentList(response.data);
    } catch (error) {
      console.log("error: ", error.data.message);
    }
  };

  return (

    <main style={{ padding: "1rem 0" }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Site</Breadcrumb.Item>
        <Breadcrumb.Item>Forum</Breadcrumb.Item>
      </Breadcrumb>

      <h2>Welcom to Forum</h2>

      <div style={{ width: '50%' }}>
        <Form
          // form={form}
          name="commentForm"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="留個言吧"
            name="comment"
            rules={[{ required: true, message: 'Please leave your comment! (less than 120 chars)' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        {/* 留言顯示區 */}
        <List
          className="comment-list"
          header={`${commentList.length} comments`}
          itemLayout="horizontal"
          dataSource={commentList}
          renderItem={item => (
            <li>
              <Comment
                author={item.username}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Avator" />}
                content={item.content}
                datetime={item.time}
              />
            </li>
          )}
        />
      </div>
    </main >
  );
}