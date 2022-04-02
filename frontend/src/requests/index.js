import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://127.0.0.1:5000/api', //Default address
    timeout: 5000,                        //Response time
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'Access-Control-Allow-Origin'
    },
});

//Request interceptor
instance.interceptors.request.use(
    /**
     * @param config    The incoming url and parameters
     */
    (config) => {
        // config.withCredentials = true;
        if (config.method === 'post') {
            config.data = JSON.stringify(config.data);
        }
        // axios.defaults.headers['Content-Type'] = 'Access-Control-Allow-Origin' //?
        return config
    },
    (error) => {
        console.log("Failed to send request")
        return Promise.reject(error)
    },
    { synchronous: true } //?
);

//Response interceptor
instance.interceptors.response.use(
    (response) => {
        //Dispatch any action on success
        return response
    },
    (error) => {
        // console.log("Response failure", error.response)
        if (error.hasOwnProperty('response')) {
            return Promise.reject(error.response)
        }
        return Promise.reject(error)
    }
);

//Register and export all the API functions
export const apiGetVisitCount = () => instance.get('/visitCount');
export const apiGetComment = (idComment) => instance.get(`/comment/${idComment}`);
export const apiGetAllComments = () => instance.get('/comments');
export const apiGetAllCommentsOfUser = (idUser) => instance.get(`/comments/${idUser}`);
export const apiRegister = data => instance.post('/user', data);
export const apiLogin = data => instance.post('/login', data, { withCredentials: true }); //edited
export const apiCreateComment = data => instance.post('/comment', data);
export const apiDeleteComment = (idComment, data) => instance.delete(`/comment/${idComment}`, { data: JSON.stringify(data) });