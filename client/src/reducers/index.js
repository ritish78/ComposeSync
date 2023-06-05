import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import document from './documents'

export default combineReducers({
    alert,
    auth,
    document
});