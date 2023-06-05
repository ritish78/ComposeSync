import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { getDocumentById } from '../../../actions/documents';
import { connect } from 'react-redux';

const DocumentItems = (props) => {
    const { document } = props;    

    return (
        <div>
            <div className="individual-document">
                <span><a href="#">{document.name}</a></span>
                <span>{document.user}</span>
                <span>{document.date}</span>
                <span><a href="#"><i className="fa-solid fa-trash"></i></a></span>
            </div>
        </div>
    )
}

DocumentItems.propTypes = {
    auth: PropTypes.object.isRequired,
    document: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(DocumentItems);