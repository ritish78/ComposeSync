import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import { setAlert } from '../../actions/alert';


const Register = props => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        avatar: '',
        password: '',
        confirmPassword: ''
    })

    const { setAlert, registerUser, isAuthenticated } = props;

    const { name, email, avatar, password, confirmPassword } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setAlert('Passwords do not match', 'danger');
        } else {
            registerUser({
                name,
                email,
                avatar,
                password
            })
        }
    }

    if (isAuthenticated) {
        return <Navigate to='/dashboard' />
    }

    return (
        <div className="login-body">
            <section className="login-container">
                <h1 className="large text-primary">Sign Up</h1>
                <p className="lead"><i class="fa-solid fa-user-plus"></i> Create Your Account</p>
                <form className="form" onSubmit={e => handleSubmit(e)}>
                    <div className="form-group">
                        <input 
                                type="text" 
                                placeholder="Name" 
                                name="name" 
                                value={name}
                                onChange={e => onChange(e)}
                                required 
                            />
                    </div>
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
                                type="text" 
                                placeholder="Avatar Url" 
                                name="avatar"
                                value={avatar}
                                onChange={e => onChange(e)}
                            />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="8"
                            value={password}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            minLength="8"
                            value={confirmPassword}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">
                        Sign Up
                    </button>    
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </section>
         </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, registerUser })(Register);