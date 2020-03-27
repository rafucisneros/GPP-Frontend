import Axios from 'axios';
import auth from './helpers/auth.js'

const SERVER_NAME = 'http://192.168.1.101:8000';

export const global = {
    // BACKEND : SERVER_NAME,
    // HEADERS : {
    //     'Content-Type': 'application/json'
    // },
    API_GET_MENSAJE: `${SERVER_NAME}/mensajito`,
    API_GET_USUARIO: `${SERVER_NAME}/usuarios`,

    API_POST_REGISTRO: `${SERVER_NAME}/user/signup`,
    API_POST_LOGIN: `${SERVER_NAME}/user/login`,

};

// export const axios = axios_core.create({
//     baseURL: global.BACKEND,
//     headers: global.HEADERS
// });

Axios.interceptors.request
    .use( (request) => {
        const token = auth.getToken();

        request.headers['Content-Type'] = 'application/json';
        if (token) request.headers.Authorization = `bearer ${token}`;
        return request;
});
  
Axios.interceptors.response
    .use( (response) => {
        return response;
    }, (error) => {
        if (401 === error.response.status) {
        window.location = '/login';
    } else {
        return Promise.reject(error.response)
    }
});