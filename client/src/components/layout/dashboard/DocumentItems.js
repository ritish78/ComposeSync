import React from 'react';
import { Link } from 'react-router-dom';

const DocumentItems = () => {
    return (
        <div className="individual-document">
            <span><a href="#">Some Facts</a></span>
            <span>You</span>
            <span><a href="#"><i className="fa-solid fa-eye"></i></a></span>
            <span><a href="#"><i className="fa-solid fa-trash"></i></a></span>
        </div>
    )
}

export default DocumentItems;