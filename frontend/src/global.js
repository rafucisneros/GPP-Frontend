import Axios from 'axios';
import auth from './helpers/auth.js'

// const SERVER_NAME = 'http://192.168.1.101:8000';
const SERVER_NAME = 'http://localhost:8000';

export const global = {
    API_GET_MENSAJE: `${SERVER_NAME}/mensajito`,
    API_GET_USUARIO: `${SERVER_NAME}/usuarios`,

    API_POST_REGISTRO: `${SERVER_NAME}/user/signup`,
    API_POST_LOGIN: `${SERVER_NAME}/user/login`,

};

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
        return Promise.reject(error.response);
});