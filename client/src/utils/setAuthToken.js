import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['jwt-token'] = token;
    } else {
        delete axios.defaults.headers.common['jwt-token'];
    }
}

export default setAuthToken;