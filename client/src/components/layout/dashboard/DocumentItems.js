import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { getDocumentById } from '../../../actions/documents';
import { connect } from 'react-redux';
import formatDate from '../../../utils/formatDate';
import { deleteDocumentById } from '../../../actions/documents';

const DocumentItems = (props) => {
    const { document, auth, deleteDocumentById } = props;    

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
                {document.data ? document.data : 'Write on the document for few lines from the document to appear here.'}
            </div>
            <div className="document-options">
            <Link to={`/document/${document._id}`}>
                <i className="fa-solid fa-eye"></i>
            </Link>
            <Link to='/dashboard'>
                <i className="fa-solid fa-share-nodes"></i>
            </Link>
                {auth.user.name === document.author ? (
                    // <button
                    //     className="delete-button"
                    //     onClick={(e) => deleteDocumentById(document._id)}
                    // >
                        <i  onClick={(e) => deleteDocumentById(document._id)}
                            className="fa-solid fa-trash"></i>
                    // </button>
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