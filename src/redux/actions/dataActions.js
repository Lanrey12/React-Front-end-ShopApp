import { axiosWrapper } from '../actions/axios-wrap'
import { GET_USERS } from '../type'


export function getAll (){
    const request = axiosWrapper.get('http://localhost:5000/accounts')
    return {
        type: GET_USERS,
        payload: request
    }      
}