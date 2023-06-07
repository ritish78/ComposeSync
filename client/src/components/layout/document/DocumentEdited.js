import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../utils/formatDate';

const DocumentEdited = props => {

    const { edited } = props;
    // console.log({edited});


    return (
        edited.map(edit => {
            return (
                <li key = {Math.random() * 10000}>
                    <p>{edit.user}</p>
                    <p>{formatDate(edit.date, true)}</p>
                </li>
            )
        })
    )
}

DocumentEdited.propTypes = {
    edited: PropTypes.array.isRequired
}

export default DocumentEdited;