import React from "react";
import PropTypes from 'prop-types';

const DocumentTop = (props) => {
    return (
        <>
            <div className="username-section">
                <h2>Some Facts</h2>
                <p><span>Test User,</span> is editing.</p>
                <button id="save-document" className="buttons">
                    Save <i className="fa-solid fa-floppy-disk"></i>
                </button>
            </div>
            <div className="user-picture">
                <img src="https://eu.ui-avatars.com/api/?name=John+Doe&size=250" alt="user profile"/>
            </div>
        </>
    )
}

export default DocumentTop;
