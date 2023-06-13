import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { getDocumentById } from '../../../actions/documents';
import { connect } from 'react-redux';
import formatDate from '../../../utils/formatDate';
import { deleteDocumentById } from '../../../actions/documents';

const DocumentItems = (props) => {
    const { document, auth, deleteDocumentById } = props;
    const modalContainerRef = useRef(null);
    
    const displayModalHandler = () => {
        if (modalContainerRef.current) {
            modalContainerRef.current.style.display = 'block';
        }
    }

    const closeModalHandler = () => {
        modalContainerRef.current.style.display = 'none';
    }

    // window.addEventListener('click', (e) => {
    //     if (e.target === modalContainer) {
    //         modalContainer.style.display = 'none';
    //     }
    // })

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
                <small>{document.data ? '': '(Empty Document)'}</small>
            </div>
            <div className="document-options">
            <Link to={`/document/${document._id}`}>
                <i className="fa-solid fa-eye"></i>
            </Link>
            <Link to='/dashboard'>
                <i className="fa-solid fa-share-nodes"></i>
            </Link>
                {auth.user.name === document.author ? (
                    <>    
                        <i  id="open-modal"
                            onClick={displayModalHandler}
                            className="fa-solid fa-trash"></i>
                        
                                <div id="modal-container"
                                    ref={modalContainerRef}>
                                    <div id="modal">
                                        <div className="modal-top-info">
                                            <p>Delete document?</p>
                                            <i  id="close-modal"
                                                onClick={closeModalHandler}
                                                className="fa-solid fa-circle-xmark"></i>
                                        </div>
                                        <div className="modal-bottom-info">
                                            <div>
                                                <p> Are you sure you want to delete {document.name}?</p>
                                            </div>
                                            <div className="modal-button-container">
                                                <button  
                                                        className="confirm-delete-button"
                                                        onClick={(e) => deleteDocumentById(document._id)}>
                                                    Delete
                                                </button>
                                                <button 
                                                        className="cancel-button"
                                                        onClick={closeModalHandler}>
                                                    Cancel
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                    </>
                        
                ) : (
                    <span>
                        <i className="fa-solid fa-users"></i>
                    </span>
                )}
            </div>
        </div>
    )
}

DocumentItems.propTypes = {
    auth: PropTypes.object.isRequired,
    document: PropTypes.object.isRequired,
    deleteDocumentById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteDocumentById })(DocumentItems);