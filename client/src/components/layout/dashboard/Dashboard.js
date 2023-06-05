import React from 'react';
import PropTypes from 'prop-types';
import DashboardActions from './DashboardActions';
import DocumentHeaders from './DocumentHeaders';
import DocumentItems from './DocumentItems';

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
            <DashboardActions />
            <div className="user-document">
                <DocumentHeaders />
                <DocumentItems />
            </div>
        </section>
    </div>
    )
}

Dashboard.propTypes = {}

export default Dashboard