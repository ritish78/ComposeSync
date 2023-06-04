import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from '../../actions/auth';

const Login = props => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { login, isAuthenticated } = props;
    const { email, password } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        login(email, password);
    }

    //Redirect to dashboard if user is already logged in
    if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }

    return (
        <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
        <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
            <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                required
            />
            </div>
            <div className="form-group">
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
            />
            </div>
            <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
    </section>
    )
}

Login.propTypes = {}

export default Login