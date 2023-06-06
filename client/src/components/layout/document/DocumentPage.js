import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import DocumentTop from './DocumentTop';
import { connect } from 'react-redux';
import { getDocumentById } from '../../../actions/documents';
import { useParams } from 'react-router-dom';
import DocumentEdited from './DocumentEdited';

const DocumentPage = props => {

    const { auth, document, getDocumentById } = props;
    const { documentId } = useParams();

    useEffect(() => {
        getDocumentById(documentId)
    }, [getDocumentById, documentId]);

    // console.log({auth});
    // console.log(document);
    // console.log(document.name);
    console.log(document);
    console.log();
    
    return (
        <div className="document-page-container">
            <section className="top-section">
                {
                    document && document.document ? 
                            <DocumentTop documentName={document.document.name} /> : ''
                }
            </section>
            <section className="bottom-section">
                <div className="editor-container">

                </div>
                <div className="last-edited">
                    <h3>Last Edited:</h3>
                    <DocumentEdited edited={document.edited}/>
                </div>
            </section>
        </div>
    )
}

DocumentPage.propTypes = {
    auth: PropTypes.object,
    document: PropTypes.object,
    getDocumentById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    document: state.document
})

export default connect(mapStateToProps,  { getDocumentById })(DocumentPage);