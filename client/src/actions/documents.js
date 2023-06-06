import axios from 'axios';
import {
    GET_ALL_DOCUMENTS,
    DOCUMENTS_ERROR,
    GET_DOCUMENT_NAME,
    GET_DOCUMENT,
    DOCUMENT_ERROR,
    DOCUMENT_LOADING,
    CREATE_DOCUMENT,
    DELETE_DOCUMENT
} from './constant';
import { setAlert } from './alert';


//Get current all document id of current user
export const getAllDocumentsIdOfCurrentUser = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/documents/mine');

        console.log('All document id of current user:', res);

        dispatch({
            type: GET_ALL_DOCUMENTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: DOCUMENTS_ERROR,
            payload: {
                message: error.response,
                status: error.response.status
            }
        })
    }
}

//Get all documents of current user
export const getAllDocumentsOfCurrentUser = () => async (dispatch) => {
    dispatch({
        type: DOCUMENT_LOADING
    });
    
    try {
        const res = await axios.get('/api/documents/mine/all');

        console.log('All document id of current user:', res);

        dispatch({
            type: GET_ALL_DOCUMENTS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: DOCUMENTS_ERROR,
            payload: {
                message: error.response,
                status: error.response.status
            }
        })
    }
}


export const getDocumentNameById = (documentId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/documents/name/${documentId}`);

        dispatch({
            type: GET_DOCUMENT_NAME,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: DOCUMENTS_ERROR,
            payload: {
                message: error.response,
                status: error.response.status
            }
        })
    }
}


export const getDocumentById = (documentId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/documents/${documentId}`);

        dispatch({
            type: GET_DOCUMENT,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: DOCUMENT_ERROR,
            payload: {
                message: error.response,
                status: error.response.status
            }
        })
    }
}


export const createDocument = (nameOfDocument) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/documents', nameOfDocument, config);

        // const newDocument = res.data;

        dispatch({
            type: CREATE_DOCUMENT,
            payload: res.data
        })

        return res.data;
        // dispatch(
        //     setAlert('Document created!', 'success')
        // )
    } catch (error) {
        dispatch({
            type: DOCUMENT_ERROR,
            payload: {
                message: error.response,
                status: error.response.status
            }
        })
    }
}


export const deleteDocumentById = (documentId) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/documents/${documentId}`);

        console.log('Deleted document of id:', documentId);
        console.log(res.data);

        dispatch({
            type: DELETE_DOCUMENT,
            payload: documentId
        })
    
    } catch (error) {
        dispatch({
            type: DOCUMENTS_ERROR,
            payload: {
                message: error.response,
                status: error.response.status
            }
        })
    }
}


/**
 * The below function is made to get all the documents of current
 * user but without the content itself. It will help to reduce the
 * bandwidth usage when trying to navigate the dashboard which does
 * not need to have the info of the contents of documents.
 * 
 * Will fix the function and implement
 */


// export const getAllDocumentsOfCurrentUserWithoutContent = () => async (dispatch) => {
//     try {
//         const res = await axios.get('/api/documents/all');

//         dispatch({
//             type: GET_ALL_DOCUMENTS,
//             payload: res.data
//         })
//     } //catch (error) {
//         dispatch({
//             type: DOCUMENTS_ERROR,
//             payload: {
//                 message: error.response,
//                 status: error.response.status
//             }
//         })
//     }
// }