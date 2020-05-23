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