import { global } from '../global';
import Axios from 'axios';

export function postTopics(data){

    return Axios.post(global.TOPICS, data)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function getExams(){

    return Axios.get(global.GET_EXAMS)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function getResultadosEstadisticas(id){
    let url = global.GET_RESULTADOS_ESTADISTICAS.replace("_eid_", id);

    return Axios.get(url)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function getAllInfoExamen(id){
    let url = global.GET_ALL_INFO_EXAM.replace("_id_", id);

    return Axios.get(url)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}