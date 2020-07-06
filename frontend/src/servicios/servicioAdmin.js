import { global } from '../global';
import Axios from 'axios';

export function getStudents(){

  return Axios.get(global.GET_STUDENTSS)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}

export function getTeachers(){

  return Axios.get(global.GET_TEACHERS)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}

export function getAdmins(){

  return Axios.get(global.GET_ADMINS)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}

export function postUser(data){
  return Axios.post(global.POST_USER, data)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}

export function putUser(id, data){
  let url = global.PUT_USER.replace("_id_", id);
  return Axios.patch(url, data)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}

export function deleteUser(id){
  let url = global.DELETE_USER.replace("_id_", id);
  return Axios.delete(url)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}

export function postSignUp(data){
  return Axios.post(global.POST_REGISTRO, data)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}