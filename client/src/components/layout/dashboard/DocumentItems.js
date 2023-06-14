import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import formatDate from '../../../utils/formatDate';
import { deleteDocumentById, shareDocumentByEmail } from '../../../actions/documents';
import ROLES from '../../../actions/userRoles';
import { toast } from 'react-toastify'; 

const DocumentItems = (props) => {
    const { document, auth, deleteDocumentById, shareDocumentByEmail } = props;
    const [sharedWithEmail, setSharedWithEmail] = useState('');
    const [userRole, setUserRole] = useState('');
    const shareModalContainerRef = useRef(null);
    const deleteModalContainerRef = useRef(null);
    
    const displayModalHandler = (modalRef) => {
        if (modalRef.current) {
            modalRef.current.style.display = 'block';
        }
    }

    const closeModalHandler = (modalRef) => {
        modalRef.current.style.display = 'none';
    }

    const optionsChangeHandler = e => {
        const selectedRole = e.target.value;

        if (selectedRole !== '') {
            setUserRole(selectedRole);
        }
    }

    const onSubmitHandler = e => {
        e.preventDefault();

        if (userRole === '') {
            toast.error('Please provide appropriate permission to user!');
            return;
        }
        shareDocumentByEmail({
            documentId: document._id,
            email: sharedWithEmail,
            role: userRole
        }).then(closeModalHandler(shareModalContainerRef));
        setSharedWithEmail('');
    }


    return (
        <div className="document-card">
            <div className="document-info">
                <Link to={`/document/${document._id}`} className="document-title">
                    {document.name}
                </Link>
                <p>
                    Author: <span>{auth.user.name === document.author ? 'You' : document.author}</span>
                </p>
                <p>Created on: <span>{formatDate(document.date, false)}</span></p>
                {/*
                     The below line of code is to have 2/3 sentences of the document visible on the card
                     on the dashboard, and if the document is empty then we display the string from else 
                     statement. We went from storing contents of document in text to objects. So, we can
                     not have document.data in it. Substituting it with different text if document empty
                */}
                {/* {document.data ? document.data : 'Write on the document for few lines from the document to appear here.'} */}
                <small>{document.data ? '': '(Empty Document)'}</small><br />
                <small>{document.sharedWith && document.sharedWith.length === 0 ?  '' : (`Shared With: ${document.sharedWith.length} other user(s)`)}</small>
            </div>
            <div className="document-options">
            <Link to={`/document/${document._id}`}>
                <i className="fa-solid fa-eye"></i>
            </Link>
            <div>
                <i 
                    id="open-modal"
                    onClick={() => displayModalHandler(shareModalContainerRef)}
                    className="fa-solid fa-share-nodes"></i>
                <div 
                id="modal-container"
                ref={shareModalContainerRef}>
                    <div id="modal">
                        <div className="modal-top-info">
                            <p className="create-info">Share document with other user</p>
                            <i  id="close-modal"
                                onClick={() => closeModalHandler(shareModalContainerRef)}
                                className="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div className="modal-bottom-form">
                            <form onSubmit={e => onSubmitHandler(e)}>
                                <label htmlFor="newDocument">
                                    Email to share the document with:
                                </label>
                                <input 
                                        type="email" 
                                        placeholder="example@email.com"
                                        value={sharedWithEmail}
                                        onChange={e => setSharedWithEmail(e.target.value)}
                                        required
                                >
                                </input>
                                <label htmlFor="user-permissions">
                                    Assign permission to shared user:
                                </label>
                                <select
                                        id="user-permissions"
                                        value={userRole}
                                        onChange={optionsChangeHandler}
                                >
                                    <option value="">Assign permission</option>
                                    <option value={ROLES.COLLABORATOR}>View and Edit</option>
                                    <option value={ROLES.VIEWER}>View</option>
                                </select>
                                <button type="submit" className="create-document-button">
                                    {'  '}Share{'  '}
                                    <i className="fa-solid fa-share-nodes"></i>
                                </button>
                            </form>     
                        </div>
                    </div>

            </div>
            </div>
                {auth.user.name === document.author ? (
                    <>    
                        <i  id="open-modal"
                            onClick={() => displayModalHandler(deleteModalContainerRef)}
                            className="fa-solid fa-trash"></i>
                        
                                <div id="modal-container"
                                    ref={deleteModalContainerRef}>
                                    <div id="modal">
                                        <div className="modal-top-info">
                                            <p>Delete document?</p>
                                            <i  id="close-modal"
                                                onClick={() => closeModalHandler(deleteModalContainerRef)}
                                                className="fa-solid fa-circle-xmark"></i>
                                        </div>
                                        <div className="modal-bottom-info">
                                            <div>
                                                <p> Are you sure you want to delete <span>{document.name}</span>?</p>
                                            </div>
                                            <div className="modal-button-container">
                                                <button  
                                                        className="confirm-delete-button"
                                                        onClick={(e) => deleteDocumentById(document._id)}>
                                                    Delete
                                                </button>
                                                <button 
                                                        className="cancel-button"
                                                        onClick={() => closeModalHandler(deleteModalContainerRef)}>
                                                    Cancel
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                    </>
                        
                ) : (
                    ''
                    // <span>
                    //     <i className="fa-solid fa-users"></i>
                    // </span>
                )}
            </div>
        </div>
    )
}

DocumentItems.propTypes = {
    auth: PropTypes.object.isRequired,
    document: PropTypes.object.isRequired,
    deleteDocumentById: PropTypes.func.isRequired,
    shareDocumentByEmail: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteDocumentById, shareDocumentByEmail })(DocumentItems);