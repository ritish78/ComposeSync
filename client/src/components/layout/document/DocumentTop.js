import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const DocumentTop = (props) => {

    const { auth, documentName } = props;

    return (
        <>
            <div className="username-section">
                <h2>{documentName}</h2>
                <p><span>{auth.user.name},</span> is editing.</p>
                <Link to='/dashboard'>
                    Dashboard <i className="fa-solid fa-arrow-left"></i>
                </Link>{'  '}
                <button id="save-document" className="buttons">
                    Save <i className="fa-solid fa-floppy-disk"></i>
                </button>
            </div>
            <div className="user-picture">
                <img src={auth.user.avatar} alt="user profile"/>
            </div>
        </>
    )
}

DocumentTop.propTypes = {
    auth: PropTypes.object,
    documentName: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(DocumentTop);
