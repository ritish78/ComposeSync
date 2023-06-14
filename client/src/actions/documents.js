import axios from 'axios';
import {
    GET_ALL_DOCUMENTS,
    DOCUMENTS_ERROR,
    GET_DOCUMENT_NAME,
    GET_DOCUMENT,
    DOCUMENT_ERROR,
    DOCUMENT_LOADING,
    CREATE_DOCUMENT,
    DELETE_DOCUMENT,
    UPDATE_DOCUMENT,
    DOCUMENT_SHARED
} from './constant';
import { toast } from 'react-toastify';

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
        toast.error(error.message);
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
    dispatch({
        type: DOCUMENT_LOADING
    });

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


export const createDocument = (documentInfo) => async (dispatch) => {
    try {
        const resolveAfterTwoSeconds = new Promise(resolve => setTimeout(resolve, 2000));
        toast.promise(
            resolveAfterTwoSeconds,
            {
                pending: 'Creating Document!',
                success: 'Document Created!',
                error: 'Could not create document!'     
            }
        );

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //Artificial Delay of two seconds before finally creating the document
        await resolveAfterTwoSeconds;
        const res = await axios.post('/api/documents', documentInfo, config);

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
        toast.error('Could not create document!');
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
        const resolveAfterTwoSeconds = new Promise(resolve => setTimeout(resolve, 2000));
        toast.promise(
            resolveAfterTwoSeconds,
            {
                pending: 'Deleting Document!',
                success: 'Document Deleted!',
                error: 'Could not delete document!'     
            }
        );

        await axios.delete(`/api/documents/${documentId}`);

        
        dispatch({
            type: DELETE_DOCUMENT,
            payload: documentId
        });

    
    } catch (error) {
        toast.error('Document deletion unsuccessful!');
        dispatch({
            type: DOCUMENTS_ERROR,
            payload: {
                message: error.response,
                status: error.response.status
            }
        })
    }
}


export const updateDocumentById = (documentId, data) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log(documentId, {data});

        // console.log('Updating document from actions/documents.js:', documentId);
        const res = await axios.post(`/api/documents/${documentId}`, JSON.stringify(data), config);
        // console.log('Update successful:', res.data);
        // console.log('res.data.data', res.data.data);

        console.log('Updated using button? ', data.savedUsingButton);
        if (data.savedUsingButton) {
            toast.success('Document Saved!');
        }
        dispatch({
            type: UPDATE_DOCUMENT,
            payload: res.data
        })
    } catch (error) {
        toast.error('Document update unsuccessful!');
        console.log('Could not update document', documentId, JSON.stringify(data));
        dispatch({
            type: DOCUMENT_ERROR,
            payload: {
                message: error.response,
                status: error.message
            }
        })
    }
}

export const shareDocumentByEmail = ({ documentId, email, role }) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        console.log('Shared Document with: ', email);
        console.log('Role assigned: ', role);

        await axios.post(`/api/documents/share/${documentId}/${email}`, JSON.stringify({ role }), config);

        dispatch({
            type: DOCUMENT_SHARED,
            payload: email
        })
        
       
        toast.success(`Document shared with ${email}`);
    } catch (error) {
        if (error.response.status === 409) {
            toast.error('Document already shared with user')
        }
        toast.error(error.response);
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