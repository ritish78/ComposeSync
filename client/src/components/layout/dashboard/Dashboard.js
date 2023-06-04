import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = props => {
    return (
        <div className="container">
        <section className="header-user">
            <div className="user-details">
                <img src="https://eu.ui-avatars.com/api/?name=John+Doe&size=250" alt="user profile"/>
                <p>Hello, <span className="username">John Doe</span></p>
            </div>
            <div className="logout-user">
                <a href="#">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                </a>
            </div>
        </section>
        <section className="documents-info">
            <div className="create-document">
                <p>Create document?</p>
                <form action="submit">
                    <label for="newDocument">
                        Name for new document:
                    </label>
                    <input type="text" placeholder="Some facts about ...">
                    </input>
                    <button type="submit" className="buttons">
                        Create
                        <i className="fa-solid fa-file-circle-plus"></i>
                    </button>
                </form>
                
                
            </div>
            <div className="user-document">
                <div className="header-document">
                    <span>Name</span>
                    <span>Author</span>
                    <span>View</span>
                    <span>Delete</span>
                </div>
                <div className="individual-document">
                    <span><a href="#">Some Facts</a></span>
                    <span>You</span>
                    <span><a href="#"><i className="fa-solid fa-eye"></i></a></span>
                    <span><a href="#"><i className="fa-solid fa-trash"></i></a></span>
                </div>
            </div>
        </section>
    </div>
    )
}

Dashboard.propTypes = {}

export default Dashboard