import {
    GET_ALL_DOCUMENTS,
    DOCUMENTS_ERROR,
    GET_DOCUMENT_NAME,
    GET_DOCUMENT,
    DOCUMENT_ERROR,
    DOCUMENT_LOADING,
    CREATE_DOCUMENT,
    DELETE_DOCUMENT
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
                document: null,
                loading: false
            }
        
        case DOCUMENTS_ERROR:
        case DOCUMENT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                document: null,
                documents: []
            }
        
        case GET_DOCUMENT_NAME:
            return {
                ...state,
                documents: payload,
                loading: false
            }
        
        case GET_DOCUMENT: 
            return {
                ...state,
                document: payload,
                documents: null,
                loading: false
            }
        
        case CREATE_DOCUMENT:
            return {
                ...state,
                // document: [payload, ...state.document],
                document: payload,
                loading: false
            }
        
        case DELETE_DOCUMENT:
            return {
                ...state,
                documents: state.documents.filter(document => document._id !== payload),
                loading: false
            }
        
        case DOCUMENT_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }
}