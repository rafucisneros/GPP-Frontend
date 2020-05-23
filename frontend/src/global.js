import Axios from 'axios';
import auth from './helpers/auth.js'

const SERVER_NAME = 'http://192.168.1.106:8000';
// const SERVER_NAME = 'http://localhost:8000';

export const global = {
    SERVER_NAME : SERVER_NAME,
    GET_MENSAJE: `${SERVER_NAME}/mensajito`,
    GET_USUARIO: `${SERVER_NAME}/user/info`,

    POST_REGISTRO: `${SERVER_NAME}/user/signup`,
    POST_LOGIN: `${SERVER_NAME}/user/login`,

    POST_CREATE_TEST: `${SERVER_NAME}/exam/create_exam/`,
    POST_SECTION: `${SERVER_NAME}/exam/_id_/section/`,
    PUT_CREATE_TEST: `${SERVER_NAME}/exam/_id_`,

    GET_STUDENTS: `${SERVER_NAME}/users/`,
};

Axios.interceptors.request
    .use( (request) => {
        const token = auth.getToken();
        request.headers['Content-Type'] = 'application/json';
        if (token) request.headers.Authorization = `Bearer ${token}`;
        console.log(request)
        // debugger
        return request;
});

Axios.interceptors.response
    .use( (response) => {
        return response;
    }, (error) => {
        if (401 === error.response.status) auth.logout();
        return Promise.reject(error.response);
});