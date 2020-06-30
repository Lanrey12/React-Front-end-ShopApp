import { BehaviorSubject } from 'rxjs';
import { axiosWrapper } from '../actions/axios-wrap'
import { REGISTER_USER, VERIFY_USER, LOGIN_USER, DELETE_USER, FORGOT_PASSWORD, VALIDATE_TOKEN, RESET_PASSWORD, GET_USERS, GET_ONE_USER, LOGOUT_USER, UPDATE_USER, ADD_USER } from '../type'
import { createBrowserHistory } from 'history';


const history = createBrowserHistory();

const userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
const baseUrl = 'http://localhost:5000/accounts';

export const accountService = {
    delete: _delete,
     user: userSubject.asObservable(),
     get userValue () { return userSubject.value }
}

export function register(params){
    const request = axiosWrapper.post(`${baseUrl}/register`, params)
    return {
        type: REGISTER_USER,
        payload: request   
    }
}

export function verifyEmail(token){
    const request = axiosWrapper.post(`${baseUrl}/verify-email`, {token})
    return{
        type: VERIFY_USER,
        payload: request
    }
}

export function loginUser(email, password){
    const request = axiosWrapper.post(`${baseUrl}/authenticate`, { email, password})
    .then (user => {
        localStorage.setItem('user', JSON.stringify(user));

            // publish user to subscribers
            userSubject.next(user);
            return user
    })
        return ({ type: LOGIN_USER,
                 payload: request,
                })  
        
}

export function logoutUser (){
    localStorage.removeItem('user')
    userSubject.next(null)
    history.push('/account/login')
    return({
        type: LOGOUT_USER
    })

}

export function forgotPassword( email ){
    const request = axiosWrapper.post(`${baseUrl}/forgot-password`, { email })
    return{
        type: FORGOT_PASSWORD,
        payload: request
    }
}

export function validateResetToken(token){
    const request = axiosWrapper.post(`${baseUrl}/validate-reset-token`, {token})
    return {
        type: VALIDATE_TOKEN,
        payload: request
    }
}

export function resetPassword({ token, password, confirmPassword }){
    const request = axiosWrapper.post(`${baseUrl}/reset-password`, { token, password, confirmPassword})
    return {
        type: RESET_PASSWORD,
        payload: request
    }
}

export function getAll (){
    const request = axiosWrapper.get('http://localhost:5000/accounts')

    return {
        type: GET_USERS,
        payload: request
    }
    
    
}

export function getById (id){
    const request = axiosWrapper.get(`${baseUrl}/${id}`)
    return {
        type: GET_ONE_USER,
        payload: request
    }
}

export function update(id, params){
    const request = axiosWrapper.put(`${baseUrl}/${id}`, params)
    .then(user => {
        // update stored user if the logged in user updated their own record
        if (user.id === userSubject.value.id) {
            // update local storage
            user = { ...userSubject.value, ...user };
            localStorage.setItem('user', JSON.stringify(user));

            // publish updated user to subscribers
            userSubject.next(user);
        }
        return user;
    });
    return ({
        type: UPDATE_USER,
        payload: request
    })
}

export function create(params) {
    const request = axiosWrapper.post('http://localhost:5000/accounts', params)
    return {
        type: ADD_USER,
        payload: request
    }
}

function _delete(id){
    const request = axiosWrapper.delete(`${baseUrl}/${id}`)
    .then(x => {
        // auto logout if the logged in user deleted their own record
        if (id === userSubject.value.id) {
            logoutUser();
        }
        return x;
    });
    return ({
        type: DELETE_USER,
        payload: request
    })
}