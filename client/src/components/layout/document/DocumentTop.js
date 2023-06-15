import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateDocumentById } from "../../../actions/documents";

const DocumentTop = (props) => {

    const { auth, documentName } = props;

    const toggleEditHistory = () => {
        const bottomSection = document.querySelector('#bottom-container');
        const lastEditedSection = document.querySelector('#last-edited-container');

        if (bottomSection.classList.contains('bottom-section')) {
            bottomSection.classList.replace('bottom-section', 'bottom-section-hidden');
            lastEditedSection.classList.replace('last-edited', 'last-edited-hidden');
        } else {
            bottomSection.classList.replace('bottom-section-hidden', 'bottom-section');
            lastEditedSection.classList.replace('last-edited-hidden', 'last-edited');
        }
    }


    return (
        <>
            <div className="username-section">
                <p>Title: <span>{documentName}</span></p>
                <p><span>{auth.user.name},</span> is editing.</p>
                <Link to='/dashboard'>
                    Dashboard <i className="fa-solid fa-arrow-left"></i>
                </Link>{'  '}
                <button 
                    id="toggle-last-edited" 
                    className="buttons"
                    onClick={() => toggleEditHistory()}
                >
                    Edit History <i className="fa-solid fa-user-pen"></i>
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
    documentName: PropTypes.string.isRequired,
    updateDocumentById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { updateDocumentById })(DocumentTop);
