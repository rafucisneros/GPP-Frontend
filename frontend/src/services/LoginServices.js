import { global, axios } from '../global';

export function getMensajito(){

  return axios.get(global.API_GET_MENSAJE,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return response;
    })
    .catch( (error) => {
      console.log(error)
    });
}