import React from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../../../actions/auth';
import { connect } from 'react-redux';

const DashboardTop = (props) => {

    const { logoutUser, auth } = props;

    return (
        <section className="header-user">
            <div className="user-details">
                <img src={auth.user.avatar} alt="user profile"/>
                <p>Hello, <span className="username">{auth.user.name}</span></p>
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
    logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
})


export default connect(mapStateToProps, { logoutUser })(DashboardTop);