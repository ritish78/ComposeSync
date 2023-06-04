import {
    SET_ALERT,
    REMOVE_ALERT
} from './constant';
import { v4 as uuid } from 'uuid';

export const setAlert = (message, alertType, timeout = 7000) => dispatch => {
    const id = uuid();

    dispatch({
        type: SET_ALERT,
        payload: {
            id,
            message,
            alertType
        }
    });

    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }), timeout);
}