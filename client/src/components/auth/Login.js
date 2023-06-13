import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from '../../actions/auth';
import { Helmet } from 'react-helmet';

const Login = props => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { loginUser, isAuthenticated } = props;
    const { email, password } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        loginUser(email, password);
    }

    //Redirect to dashboard if user is already logged in
    if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }

    return (
        <div className='login-body'>
            <Helmet>
                <title>Sign In - ComposeSync</title>
            </Helmet>
            <section className="login-container">
                <h1 className="large text-primary">ComposeSync</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        {
                            /**
                             * Removing the labels as the website looks cleaner
                             * without the labels. The input already has placeholder
                             * for user to know about fields to input
                             */
                        }
                        {/* <label
                            htmlFor="user-email">
                                <small>Email:</small>
                        </label> */}
                        <input
                            id="user-email"
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        {/* <label
                            htmlFor="user-password">
                                <small>Password:</small>
                        </label> */}
                        <input
                            id="user-password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
             </section>
        </div>
    )
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loginUser })(Login)