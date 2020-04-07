import { global } from '../global';
import Axios from 'axios';

export function login(data){
  const axios = Axios.create({
    baseURL: global.SERVER_NAME
  });

  return axios.post(global.API_POST_LOGIN, data)
    .then((response) => {
      return response;
    })
    .catch( (error) => {
      return Promise.reject(error);
    });
}

export function register(data){

    return Axios.post(global.API_POST_REGISTRO, data)
      .then((response) => {
        return response;
      })
      .catch( (error) => {
        return Promise.reject(error);
      });
}

export function getDataUsuario(){

    return Axios.get(global.API_GET_USUARIO)
      .then((response) => {
        return response;
      })
      .catch( (error) => {
        return Promise.reject(error);
      });
}