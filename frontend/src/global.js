import Axios from 'axios';
import auth from './helpers/auth.js'

// const SERVER_NAME = 'http://192.168.1.129:8000';
const SERVER_NAME = 'http://gpiback.herokuapp.com'; 
// const SERVER_NAME = 'http://localhost:8000';

export const global = {
    SERVER_NAME : SERVER_NAME,
    GET_MENSAJE: `${SERVER_NAME}/mensajito`,
    GET_USUARIO: `${SERVER_NAME}/user/info`,

    POST_REGISTRO: `${SERVER_NAME}/user/signup`,
    POST_LOGIN: `${SERVER_NAME}/user/login`,

    POST_CREATE_TEST: `${SERVER_NAME}/exam/create_exam/`,
    POST_SECTION: `${SERVER_NAME}/exam/_id_/section/`,
    POST_QUESTION_EXAM: `${SERVER_NAME}/exam/_id_/question/`,
    POST_ALL_QUESTIONS_EXAM: `${SERVER_NAME}/exam/_id_/questions/`,
    PATCH_CONF_DINAMICA: `${SERVER_NAME}/exam/_id_/configuration/`,
    DELETE_QUESTION:  `${SERVER_NAME}/exam/_eid_/question/_qid_`,
    // PUT_CREATE_TEST: `${SERVER_NAME}/exam/_id_`,

    GET_STUDENTS: `${SERVER_NAME}/students`,
    GET_RESULTADOS_ESTADISTICAS: `${SERVER_NAME}/resultados/_eid_`,
    GET_EXAMS: `${SERVER_NAME}/exams/`,
    TOPICS: `${SERVER_NAME}/approach/`,

    GET_EXAM:  `${SERVER_NAME}/exam/_id_`,
    GET_ALL_INFO_EXAM:  `${SERVER_NAME}/exam/_id_/complete/`,
    GET_EXAM_QUESTIONS:  `${SERVER_NAME}/exam/_id_/questions/`,
    POST_STUDENT_EXAM_QUESTIONS: `${SERVER_NAME}/student/_sid_/exam/_eid_/answers/`,

    GET_EXAM_CONFIGURATION: `${SERVER_NAME}/exam/_id_/configuration/`,
    GET_EXAM_SECTIONS: `${SERVER_NAME}/exam/_id_/section/`,

    POST_USER:  `${SERVER_NAME}/users/`,
    DELETE_USER:  `${SERVER_NAME}/users/_id_/`,
    PATCH_USER:  `${SERVER_NAME}/users/_id_/`,
    GET_TEACHERS:  `${SERVER_NAME}/teachers`,
    GET_TEACHER_EXAMS:  `${SERVER_NAME}/exams/teacher/_id_`,
    GET_STUDENTSS:  `${SERVER_NAME}/students`,
    GET_ADMINS:  `${SERVER_NAME}/admins`,
    POST_USER_PASSWORD:  `${SERVER_NAME}/user/password`,
    GET_EXAMS_TEACHER:  `${SERVER_NAME}/exams/teacher/_id_`,
    GET_SECTION_STUDENT:  `${SERVER_NAME}/section/student/_id_`,
    GET_EXAM_RESULTS:  `${SERVER_NAME}/exam/_id_/results/`,
    GET_EXAM_COMPLETE:  `${SERVER_NAME}/exam/_id_/complete/`,
    GET_EXAM_RESULTS_STUDENT:  `${SERVER_NAME}/exam/_eid_/results/student/_sid_`,
    POST_EXAM_FINISH:  `${SERVER_NAME}/exam/_id_/finish/`,
    GET_STUDENT_RESULTS:  `${SERVER_NAME}/student/_sid_/results/`,
    // POST_USER:  `${SERVER_NAME}/`,

};

Axios.interceptors.request
    .use( (request) => {
        const token = auth.getToken();
        request.headers['Content-Type'] = 'application/json';
        if (token) request.headers.Authorization = `Bearer ${token}`;
        return request;
});

Axios.interceptors.response
    .use( (response) => {
        return response;
    }, (error) => {
        if (401 === error.response.status || 403 === error.response.status) auth.logout();
        return Promise.reject(error.response);
});