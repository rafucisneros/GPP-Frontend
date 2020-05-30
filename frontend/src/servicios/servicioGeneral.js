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