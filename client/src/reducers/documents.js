import {
    GET_ALL_DOCUMENTS,
    DOCUMENTS_ERROR,
    GET_DOCUMENT_NAME
} from '../actions/constant';

const initialState = {
    document: null,
    documents: [],
    loading: true,
    errors: {}
}

export default function documentReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_DOCUMENTS:
            return {
                ...state,
                documents: payload,
                loading: false
            }
        
        case DOCUMENTS_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                document: null
            }
        
        case GET_DOCUMENT_NAME:
            return {
                ...state,
                documents: payload,
                loading: false
            }

        default:
            return state;
    }
}