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
        <div>
            <div className="individual-document">
                <span><Link to={`/document/${document._id}`}>{document.name}</Link></span>
                {
                    auth.user.name === document.author ? 
                        (<span>You</span>) : (<span>{document.author}</span>)
                }
                <span>{formatDate(document.date, false)}</span>
                {
                    auth.user.name === document.author ?
                        (
                            <span>
                                <button 
                                        className='delete-button'
                                        onClick={e => deleteDocumentById(document._id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </span>
                            
                           ) : (<span><i class="fa-solid fa-users"></i></span>)
                }
                
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