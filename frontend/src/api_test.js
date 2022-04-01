import { apiGetVisitCount } from './requests'

apiGetVisitCount()
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    console.log(error.data.message);
  });

// try {
//   const res = await apiGetVisitCount();
//   console.log(res.data);
// } catch (error) {
//   //Log errors
//   console.log(error);
// }

apiGetComment(id)
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    console.log(error.data.message);
  });

// 登入
let data = {
  username: '系統管理者',
  password: 'qwert',
}
apiLogin(data)
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    console.log(error);
  });

// 註冊
data = {
  username: 'LostInLofi',
  password: 'qwert',
  description: 'Lofi is God, I recommand Lofi music.'
}
apiRegister(data)
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    console.log(error.data.message);
  });

// 新增留言
// let data = {
//   idUser: 10,
//   comment: 'Lofi is God, I recommand Lofi music.',
// }
apiCreateComment(data)
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    console.log(error.data.message);
  });

// 刪除留言
// let idComment = 4
// let data = {
//   idUser: 10
// }
apiDeleteComment(idComment, data)
  .then(res => {
    console.log(res.data);
  })
  .catch(error => {
    console.log(error.data.message);
  });