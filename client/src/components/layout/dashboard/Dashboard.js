import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import DocumentHeaders from './DocumentHeaders';
import DocumentItems from './DocumentItems';
import DashboardTop from './DashboardTop';
import { getAllDocumentsOfCurrentUser  } from '../../../actions/documents';
import Spinner from '../Spinner';
import DocumentEmpty from './DocumentEmpty';

const Dashboard = (props) => {
    const { getAllDocumentsOfCurrentUser, auth, document: { documents, loading } } = props;
    
    useEffect(() => {
        getAllDocumentsOfCurrentUser();
    }, [getAllDocumentsOfCurrentUser]);

    // const documentTest = {
    //     'name': 'Facts about water',
    //     'user': 'Admin',
    //     'date': '5/06/2023'
    // }
    
    return (
        <div className="container">
        <DashboardTop />
        <section className="documents-info">
            <DashboardActions />
            <div className="user-document">
                {
                    loading && documents ? (
                        <Spinner /> 
                    ) : (
                        <div>
                            <DocumentHeaders />
                            {
                                documents && documents.length > 0 ? ( 
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
    // getDocumentById: PropTypes.func.isRequired,   need to add in connect aswell
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    document: state.document
})

export default connect(mapStateToProps, { getAllDocumentsOfCurrentUser })(Dashboard);