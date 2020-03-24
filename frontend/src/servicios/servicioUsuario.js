import { global } from '../global';
import Axios from 'axios';

export function login(data){

  return Axios.post(global.API_POST_LOGIN, data)
    .then((response) => {
      return response;
    })
    .catch( (error) => {
      console.log(error)
    });
}

export function register(data){

    return Axios.post(global.API_POST_REGISTRO, data)
      .then((response) => {
        return response;
      })
      .catch( (error) => {
        console.log(error)
      });
}

export function getDataUsuario(){

    return Axios.post(global.API_GET_USUARIO)
      .then((response) => {
        return response;
      })
      .catch( (error) => {
        console.log(error)
      });
}