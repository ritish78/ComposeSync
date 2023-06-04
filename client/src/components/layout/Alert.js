import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = props => props.alert !== null && props.alerts.length > 0 && props.alerts.map(alert =>{
    return (
        <div className='alert-wrapper' key={alert.id}>
            <div className={`alert alert-${alert.alertType}`}>
                { alert.message }
            </div>
        </div>
    )
})

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);