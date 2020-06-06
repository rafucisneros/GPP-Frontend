import { global } from '../global';
import Axios from 'axios';

export function getExamConfiguration(req, id){
  let url = global.GET_EXAM_CONFIGURATION.replace("_id_", id);

  return Axios.get(url, req)
  .then((response) => {
      return response;
  })
  .catch( (error) => {
      return Promise.reject(error);
  });
}