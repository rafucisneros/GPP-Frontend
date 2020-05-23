import { global } from '../global';
import Axios from 'axios';

export function getMensajito(){

    return Axios.get(global.GET_MENSAJE)
      .then((response) => {
        return response;
      })
      .catch( (error) => {
        console.log(error)
      });
  }