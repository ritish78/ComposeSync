import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DocumentTop from './DocumentTop';
import { connect } from 'react-redux';
import { getDocumentById, updateDocumentById } from '../../../actions/documents';
import { useParams } from 'react-router-dom';
import DocumentEdited from './DocumentEdited';
import TextEditor from '../texteditor/TextEditor';

const DocumentPage = props => {

    const [textEditorData, setTextEditorData] = useState();

    const { auth, document, getDocumentById } = props;
    const { documentId } = useParams();

    useEffect(() => {
        getDocumentById(documentId)
    }, [getDocumentById, documentId]);

    const testEdited = [
        {
            user: 'Admin',
            date: '2023-06-05T12:42:40.454+00:00'
        },
        {
            user: 'Random User',
            date: '2023-06-05T12:42:40.454+00:00'
        }
    ]

    const handleSave = () => {
        updateDocumentById(
            documentId,
            {
                textEditorData,
                savedUsingButton: true 
            })
    }

    return (
        <div className="document-page-container">
            <section className="top-section">
                {
                    document && document.document ? 
                            <DocumentTop documentName={document.document.name} onSave={handleSave}/> : ''
                }
            </section>
            <section id="bottom-container" className="bottom-section-hidden">
                <div className="editor-container" id="text-editor">
                    {
                        document && document.document && 
                            <TextEditor data={document.document.data} documentId={documentId} setData={setTextEditorData}/>
                    }
                </div>
                <div id="last-edited-container" className="last-edited-hidden">
                    <h3>Last Edited:</h3>
                    {
                        //Here, we are checking if document exists first, then we check if the document.document has values
                        //and if so, then we again check if edited field exists. And if edited field exists then
                        //we check the length of it since it is an array. If no edits is done, we return 'No Edits'
                        // document && document.document && document.document.edited && document.document.edited.length > 0 ? 
                        document ?
                            (<ol>
                                {/* <DocumentEdited edited={document.document.edited}/> */}
                                <DocumentEdited edited={testEdited}/>
                            </ol> 
                            ) : ('No Edits') 
                    }
                </div>
            </section>
        </div>
    )
}

DocumentPage.propTypes = {
    auth: PropTypes.object,
    document: PropTypes.object,
    getDocumentById: PropTypes.func.isRequired,
    updateDocumentById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    document: state.document
})

export default connect(mapStateToProps,  { getDocumentById, updateDocumentById })(DocumentPage);