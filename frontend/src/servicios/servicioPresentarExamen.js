import { global } from '../global';
import Axios from 'axios';

export function getExamQuestions(req, id){
  let url = global.GET_EXAM_QUESTIONS.replace("_id_", id);

  return Axios.get(url, req)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}

export function getExam(req, id){
  let url = global.GET_EXAM.replace("_id_", id);

  return Axios.get(url, req)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}

export function saveExamAnswers(req, studentId, attemp){
  let url = global.POST_STUDENT_EXAM_QUESTIONS
                  .replace("_sid_", studentId)
                  .replace("_eid_", attemp);

  return Axios.patch(url, req)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}

export function finishExam(req, examId){
  let url = global.POST_EXAM_FINISH
                  .replace("_id_", examId);

  return Axios.post(url, req)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}