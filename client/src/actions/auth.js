import axios from  'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_DOCUMENT
} from './constant';
import { toast } from 'react-toastify';
import setAuthToken from '../utils/setAuthToken';


//Load user
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        //This should return back the details of current user
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


//Register User
export const registerUser = ({ name, email, avatar, password }) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, avatar, password });

    try {
        
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        toast.success('Registration successful!');
        dispatch(loadUser());

    } catch (error) {
        // toast.error('Invalid input in fields!');
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => toast.error(error.message));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}


//Login User
export const loginUser = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        toast.success('Welcome!');
        dispatch(loadUser());
    } catch (error) {
        toast.error('Invalid Credentials!');
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.message, 'danger')))
        }

        dispatch({
            type: LOGIN_FAIL
        })
    }
}


//Logout
export const logoutUser = () => (dispatch) => {
    dispatch({ type: CLEAR_DOCUMENT });
    dispatch({ type: LOGOUT });
    toast.success('Logged Out!');
}