import React from 'react'
import PropTypes from 'prop-types'

const Document = props => {
    return (
        <div className="document-page-container">
            <section className="top-section">
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
            </section>
            <section className="bottom-section">
                <div className="editor-container">

                </div>
                <div className="last-edited">
                    <h3>Last Edited:</h3>
                    <ol>
                        <li>
                            <p>Test User</p>
                            <p>(2 Jan, 2023)</p>
                        </li>
                        <li>
                            <p>Another User</p>
                            <p>(2 Jan, 2023)</p>
                        </li>
                        <li>
                            <p>Test User</p>
                            <p>(3 Jan, 2023)</p>
                        </li>
                    </ol>
                </div>
            </section>
        </div>
    )
}

Document.propTypes = {}

export default Document