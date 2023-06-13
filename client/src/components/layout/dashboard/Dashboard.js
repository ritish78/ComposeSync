import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import DocumentItems from './DocumentItems';
import DashboardTop from './DashboardTop';
import { getAllDocumentsOfCurrentUser  } from '../../../actions/documents';
import Spinner from '../Spinner';
import DocumentEmpty from './DocumentEmpty';
import { Helmet } from 'react-helmet';

const Dashboard = (props) => {
    const { getAllDocumentsOfCurrentUser, auth, document: { documents, loading } } = props;
    
    useEffect(() => {
        getAllDocumentsOfCurrentUser();
    }, [getAllDocumentsOfCurrentUser]);


    if (!auth.user) return;
    
    return (
        <div className="container">
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <DashboardTop />
        <section className="documents-info">
            <DashboardActions />
            <div className="user-document">
                {
                    loading && documents ? (
                        <Spinner /> 
                    ) : (
                        <div className="created-documents-section">
                            {/* <DocumentHeaders /> */}
                            {
                                documents && documents.length > 0 && document ? ( 
                                    documents.map(document => (
                                        <DocumentItems key={document._id} document={document} />
                                    ))
                                ) : (
                                    !loading && <DocumentEmpty />
                            )}
                            
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