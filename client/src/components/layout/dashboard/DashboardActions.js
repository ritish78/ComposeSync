import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createDocument } from '../../../actions/documents';

const DashboardActions = (props) => {

    const [documentName, setDocumentName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [expires, setExpires] = useState(false);
    const modalContainerRef = useRef(null);

    const { createDocument } = props;
    const navigate = useNavigate();

    const onSubmitHandler = e => {
        e.preventDefault();

        //We are creating a document and we receive the document back
        //Then we navigate to /document/:documentId of the created document
        createDocument(
            { 
                name: documentName,
                expiresAt: expiryDate
            }).then(document => navigate(`/document/${document._id}`));

        //Clearing the name of document form
        setDocumentName('');
    }

    const expiryCheckboxHandler = e => {
        setExpires(e.target.checked);
    }



    const displayModalHandler = () => {
        if (modalContainerRef.current) {
            modalContainerRef.current.style.display = 'block';
        }
    }

    const closeModalHandler = () => {
        modalContainerRef.current.style.display = 'none';
    }

    return (
        <div className="create-document">
            <p>Create document?</p>
            <button type="submit" className="buttons" onClick={displayModalHandler}>
                {'  '}New{'  '}
                <i className="fa-solid fa-file-circle-plus"></i>
            </button>
            <div 
                id="modal-container"
                ref={modalContainerRef}>
                    <div id="modal-create-doc">
                        <div className="modal-top-info">
                            <p className="create-info">Create a new document</p>
                            <i  id="close-modal"
                                onClick={closeModalHandler}
                                className="fa-solid fa-circle-xmark"></i>
                        </div>
                        <div className="modal-bottom-form">
                            <form onSubmit={e => onSubmitHandler(e)}>
                                <label htmlFor="newDocument">
                                    Name of new document:
                                </label>
                                <input 
                                        type="text" 
                                        placeholder="Some facts about ..."
                                        value={documentName}
                                        onChange={e => setDocumentName(e.target.value)}
                                        required
                                >
                                </input>
                                <div className='same-line'>
                                    <label>
                                        Expires?
                                    </label>
                                    <input
                                            id="has-expiry"
                                            value={expires}
                                            type="checkbox"
                                            onChange={e => expiryCheckboxHandler(e)}
                                    ></input>
                                </div>
                                {
                                    expires && (
                                        <>
                                            <label htmlFor="expiry-date">
                                                Expires At:
                                            </label>
                                            <input
                                                    type="date"
                                                    value={expiryDate}
                                                    onChange={e => {
                                                        console.log(e.target.value);
                                                        setExpiryDate(e.target.value)}}
                                            ></input>
                                        </>
                                    )
                                }
                                
                                <button type="submit" className="create-document-button">
                                    {'  '}Create{'  '}
                                    <i className="fa-solid fa-file-circle-plus"></i>
                                </button>
                            </form>     
                        </div>
                    </div>
            </div>
            
        </div>
    )
}

DashboardActions.propTypes = {
    createDocument: PropTypes.func.isRequired
}

export default connect(null, { createDocument })(DashboardActions);