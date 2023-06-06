import React from 'react';
import PropTypes from 'prop-types';

const DocumentEdited = props => {

    const { edited } = props;

    return (
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
    )
}

DocumentEdited.propTypes = {
    // edited: PropTypes.array.isRequired
}

export default DocumentEdited