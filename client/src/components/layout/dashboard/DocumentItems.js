import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDocumentById } from '../../../actions/documents';
import { connect } from 'react-redux';

const DocumentItems = (props) => {
    const { documents, getDocumentById } = props;

    // console.log(documents);
    const allDocumentsOfUser = documents.map(document => getDocumentById(document._id));
    console.log(allDocumentsOfUser);

    return (
        <div className="individual-document">
            <span><a href="#">Some Facts</a></span>
            <span>You</span>
            <span>Jan 2, 2023</span>
            <span><a href="#"><i className="fa-solid fa-trash"></i></a></span>
        </div>
    )
}

DocumentItems.propTypes = {
    documents: PropTypes.array,
    getDocumentById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(DocumentItems);