import React from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../../../actions/auth';
import { connect } from 'react-redux';

const DashboardTop = (props) => {

    const { logoutUser } = props;

    return (
        <section className="header-user">
            <div className="user-details">
                <img src="https://eu.ui-avatars.com/api/?name=John+Doe&size=250" alt="user profile"/>
                <p>Hello, <span className="username">John Doe</span></p>
            </div>
            <div className="logout-user">
                <a onClick={logoutUser} href="#!">
                    <i className="fa-solid fa-right-from-bracket"></i>{' '}
                    Logout
                </a>
            </div>
        </section>
    )
}

DashboardTop.propTypes = {
    logoutUser: PropTypes.func.isRequired
}


export default connect(null, { logoutUser })(DashboardTop);