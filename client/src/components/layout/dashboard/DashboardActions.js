import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { createDocument } from '../../../actions/documents';

const DashboardActions = (props) => {

    const [documentName, setDocumentName] = useState('');

    const { createDocument } = props;
    const navigate = useNavigate();

    const onSubmitHandler = e => {
        e.preventDefault();

        createDocument({ name: documentName })
            .then(document => navigate(`/document/${document._id}`));

        //Clearing the name of document form
        setDocumentName('');
    }

    return (
        <div className="create-document">
            <p>Create document?</p>
            <form onSubmit={e => onSubmitHandler(e)}>
                <label htmlFor="newDocument">
                    Name for new document:
                </label>
                <input 
                        type="text" 
                        placeholder="Some facts about ..."
                        value={documentName}
                        onChange={e => setDocumentName(e.target.value)}
                        required
                >
                </input>
                <button type="submit" className="buttons">
                    {'  '}Create{'  '}
                    <i className="fa-solid fa-file-circle-plus"></i>
                </button>
            </form>     
        </div>
    )
}

DashboardActions.propTypes = {
    createDocument: PropTypes.func.isRequired
}

export default connect(null, { createDocument })(DashboardActions);