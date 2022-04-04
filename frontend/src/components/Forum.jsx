import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import { Row, Col, Input, Button, Form } from 'antd';
import { Comment, List, Avatar } from 'antd';
import { Breadcrumb } from 'antd';
const { TextArea } = Input;
import ErrorMsg from './ErrorMsg';
import { apiGetAllComments, apiCreateComment, apiDeleteComment } from '../requests'

export default function Formun({ idUser, username, access_token }) {
  // https://zh-hant.reactjs.org/docs/forms.html
  // https://zh-hant.reactjs.org/docs/handling-events.html

  // const [inputUsername, setInputUsername] = useState("");
  // const [inputComment, setInputComment] = useState("123");
  // const [form] = Form.useForm();
  const [commentList, setCommentList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  /* Called when rendered (mounted) */
  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = values => {
    // console.log('Received values of form: ', values);
    if (!access_token) {
      setErrorMessage(`Please login.`)
      return
    }
    if (values.comment.length > 120) {
      return setErrorMessage('Please leave your comment! (less than 120 chars)');
    }
    const requestBody = {
      idUser: idUser,
      comment: values.comment,
      token: access_token,
    }
    creatComment(requestBody);
  };

  const creatComment = async (requestBody) => {
    try {
      const response = await apiCreateComment(requestBody);
      fetchData();
    } catch (error) {
      if (error.data?.message) {
        setErrorMessage("error: ", error.data.message);
      }
      else {
        setErrorMessage("error: ", error);
      }
    }
  };

  const fetchData = async () => {
    try {
      const response = await apiGetAllComments();
      // console.log(response);
      setCommentList(response.data);
    } catch (error) {
      setErrorMessage("error: ", error.data.message);
    }
  };

  const deleteComment = async (idComment) => {
    // console.log(`delete comment id ${idComment}`)
    try {
      const response = await apiDeleteComment(idComment, idUser, access_token)
      fetchData();
    } catch (error) {
      setErrorMessage("error: ", error.data.message);
    }
  }

  const getAvatar = (commentItem) => {
    if (commentItem.avatar)
      return commentItem.avatar
    return "https://joeschmoe.io/api/v1/random"
  }

  return (

    <main style={{ padding: "1rem 0" }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Site</Breadcrumb.Item>
        <Breadcrumb.Item>Forum</Breadcrumb.Item>
      </Breadcrumb>

      <h2>Welcom to Forum {username ? `, ${username}.` : ``}</h2>

      <div style={{ width: '60%' }}>
        <ErrorMsg msg={errorMessage} />
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
              <Row align="middle">
                <Comment
                  author={item.username}
                  avatar={<Avatar size="large" src={getAvatar(item)} alt="Avator" />}
                  content={item.content}
                  datetime={item.time}
                />
                {
                  item.idUser === idUser ?
                    <Button style={{ marginLeft: '10px' }} onClick={() => deleteComment(item.idComment)}>
                      刪除
                    </Button>
                    : <></>
                }

              </Row>
            </li>
          )}
        />
      </div>
    </main >
  );
}