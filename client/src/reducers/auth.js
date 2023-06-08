import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    LOGOUT,
    AUTH_ERROR
} from '../actions/constant';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function authReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                // ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }

        default:
            return state;
    }
}