import { global } from '../global';
import Axios from 'axios';

export function login(data){
  const axios = Axios.create({
    baseURL: global.SERVER_NAME
  });

  return axios.post(global.POST_LOGIN, data)
    .then((response) => {
      return response;
    })
    .catch( (error) => {
      return Promise.reject(error);
    });
}

export function register(data){

    return Axios.post(global.POST_REGISTRO, data)
      .then((response) => {
        return response;
      })
      .catch( (error) => {
        return Promise.reject(error);
      });
}

export function getDataUsuario(){

    return Axios.get(global.GET_USUARIO)
      .then((response) => {
        return response;
      })
      .catch( (error) => {
        return Promise.reject(error);
      });
}