import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://127.0.0.1:5000/api', //Default address
    timeout: 5000,                        //Response time
    headers: {
        'Content-Type': 'application/json',
    },
});

//Request interceptor
instance.interceptors.request.use(
    /**
     * @param config    The incoming url and parameters
     */
    (config) => {
        // config.withCredentials = true;
        if (config?.data && config.data?.token) {
            console.log(`config.data:${config.data}`)
            config.headers.Authorization = `Bearer ${config.data.token}`;
        }
        if (config.method === 'post') {
            config.data = JSON.stringify(config.data);
        }
        if (config.method === 'delete') {
            console.log(config)
            config.data = {
                headers: {
                    Authorization: `Bearer ${config.token}`
                },
                idUser: config.idUser,
            };
            config.data = JSON.stringify(config.data);
            console.log(config.data)
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
export const apiLogin = data => instance.post('/login', data);
export const apiCreateComment = data => instance.post('/comment', data);
export const apiGetCookieTest = () => instance.get(`/test`, { withCredentials: true });
// export { apiDeleteComment };
export const apiDeleteComment = async (idComment, idUser, token) => {
    try {
        const config = {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            data: JSON.stringify({
                "idUser": idUser
            })
        }
        const response = await axios.delete(`https://127.0.0.1:5000/api/comment/${idComment}`, config)
        return response
    }
    catch (error) {
        console.error("apiDeleteComment() error: ", error)
        return error
    }
};