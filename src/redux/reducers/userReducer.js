import { ON_SUCCESS_BUY, GET_CART_ITEMS_USER, REMOVE_CART_ITEM_USER, REGISTER_USER, ADD_TO_CART_USER, VERIFY_USER, LOGIN_USER, FORGOT_PASSWORD, RESET_PASSWORD, VALIDATE_TOKEN, GET_USERS, GET_ONE_USER, LOGOUT_USER, UPDATE_USER, ADD_USER, DELETE_USER } from "../type"

const initialState = {
    users: [],
    userData: {
        bio: "",
        email: "",
        firstName: "",
        imageUrl: "",
        lastName: "",
        location: "",
        role: "",
        title: "",
        website: "",
    }
}

export default function(state = initialState, action){
    switch(action.type){
        case REGISTER_USER:
            return {
                ...state, register: action.payload }
        case VERIFY_USER:
            return {
                ...state, verifyUser: action.payload}
        case LOGIN_USER:
            return{
                ...state, loginUser: action.payload
            }
        case FORGOT_PASSWORD:
            return {
                ...state, forgotPassword: action.payload
            }
        case VALIDATE_TOKEN:
            return{
                ...state, validateResetToken: action.payload
            }
        case RESET_PASSWORD:
            return{
                ...state, resetPassword: action.payload
            }
        case GET_USERS:
                return{
            ...state, users: action.payload
                }
        case GET_ONE_USER:
            return{
        ...state,
        userData: action.payload,
        }
        case UPDATE_USER:
            return{
                ...state,
            userData: action.payload 
        }
        case ADD_USER:
            return{
                ...state,
                users: [
                  action.payload,
                ]
            }
        case DELETE_USER:
            let index = state.users.findIndex(user => user.id === action.payload)
            state.users.splice(index, 1)
            return{
            ...state,
            }
        case LOGOUT_USER:
            return{
                ...state
            }
        case ADD_TO_CART_USER:
            return{
              ...state,
              userData:{
                  ...state.userData, 
                  cart: action.payload
              }  
            }
        case GET_CART_ITEMS_USER:
            return{
                ...state,
                cartDetail: action.payload
            }
        case REMOVE_CART_ITEM_USER:
            return{
                ...state,
                cartDetail: action.payload.cartDetail,
                userData:{
                    ...state.userData,
                    cart: action.payload.cart
                }
            }
        case ON_SUCCESS_BUY: 
           return {
               ...state,
               userData:{
                   ...state.userData,
                   cart: action.payload.cart
               },
               cartDetail: action.payload.cartDetail

           }
            default:
                return state
    }
}