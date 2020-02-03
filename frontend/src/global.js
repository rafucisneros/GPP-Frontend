import axios_core from 'axios';

export const global = {
    BACKEND : 'http://localhost:8000',
    HEADERS : {
        'Content-Type': 'application/json'
    },
    API_GET_MENSAJE: 'http://localhost:8000/mensajito'

};

export const axios = axios_core.create({
    baseURL: global.BACKEND,
    headers: global.HEADERS
});
  
axios.interceptors.response
    .use( (response) => {
        return response;
    }, (error) => {
        if (401 === error.response.status) {
        window.location = '/login';
    }
});