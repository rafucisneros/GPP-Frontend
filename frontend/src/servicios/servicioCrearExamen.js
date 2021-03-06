import { global } from '../global';
import Axios from 'axios';

export function createTest(data){

    return Axios.post(global.POST_CREATE_TEST, data)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function getStudents(){

    return Axios.get(global.GET_STUDENTS)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function postSecciones(req, id){
    let url = global.POST_SECTION.replace("_id_", id);

    return Axios.post(url, req)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function postPreguntasExamen(req, id){
    let url = global.POST_QUESTION_EXAM.replace("_id_", id);

    return Axios.post(url, req)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function postAllPreguntasExamen(req, id){
    let url = global.POST_ALL_QUESTIONS_EXAM.replace("_id_", id);

    return Axios.post(url, req)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function patchConfigDinamica(req, id){
    let url = global.PATCH_CONF_DINAMICA.replace("_id_", id);

    return Axios.patch(url, req)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function getTopics(){
    return Axios.get(global.TOPICS)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function deletePregunta(eid, qid){
    let url = global.DELETE_QUESTION.replace("_eid_", eid).replace("_qid_", qid);

    return Axios.delete(url)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}