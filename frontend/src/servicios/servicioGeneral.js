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

export function getExamsForTeacher(teacherId){
    let url = global.GET_EXAMS_TEACHER.replace("_id_", teacherId);
    return Axios.get(url)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function getExamsForStudent(studentId){
    let url = global.GET_SECTION_STUDENT.replace("_id_", studentId);
    return Axios.get(url)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}

export function getResultsForExam(examId){
    let url = global.GET_EXAM_RESULTS.replace("_id_", examId);
    return Axios.get(url)
    .then((response) => {
        return response;
    })
    .catch( (error) => {
        return Promise.reject(error);
    });
}