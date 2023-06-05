import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import DocumentHeaders from './DocumentHeaders';
import DocumentItems from './DocumentItems';
import DashboardTop from './DashboardTop';
import { getAllDocumentsOfCurrentUser } from '../../../actions/documents';
import Spinner from '../Spinner';

const Dashboard = props => {
    const { getAllDocumentsOfCurrentUser, auth, document: { documents, loading } } = props;
    
    useEffect(() => {
        getAllDocumentsOfCurrentUser();
    }, [getAllDocumentsOfCurrentUser]);



    return (
        <div className="container">
        <DashboardTop />
        <section className="documents-info">
            <DashboardActions />
            <div className="user-document">
                {
                    loading && documents === null ? <Spinner /> :
                     (
                        <div>
                            <DocumentHeaders />
                            <DocumentItems documents={documents}/>
                        </div>    
                     )
                }
            </div>
        </section>
    </div>
    )
}

Dashboard.propTypes = {
    getAllDocumentsOfCurrentUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    document: state.document
})

export default connect(mapStateToProps, { getAllDocumentsOfCurrentUser })(Dashboard);