import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DocumentTop from './DocumentTop';
import { connect } from 'react-redux';
import { getDocumentById, updateDocumentById } from '../../../actions/documents';
import { useParams } from 'react-router-dom';
import DocumentEdited from './DocumentEdited';
import TextEditor from '../texteditor/TextEditor';
import { Helmet } from 'react-helmet';
import { io } from 'socket.io-client';

const DocumentPage = props => {

    const [textEditorData, setTextEditorData] = useState();
    const { auth, document, getDocumentById } = props;
    const { documentId } = useParams();

    const [socket, setSocket] = useState();

    useEffect(() => {
        const socket = io('http://localhost:5000');
        setSocket(socket);

        socket.emit('user-joined', { 
            username: auth.user.name,
            documentId
        });
    
        return () => {
            socket.disconnect()
        }
    }, [])

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

    const handleSaveFromButton = () => {
        console.log('Inside DocumentPage: ', {textEditorData});
        updateDocumentById(
            documentId,
            {
                data: textEditorData,
                savedUsingButton: true 
            });
        console.log('document update successful from layout/document');
    }

    return (
        <div className="document-page-container">
            {
                document && document.document ?
                    (
                        <Helmet>
                            <title>{document.document.name}</title>
                        </Helmet>
                    ) : 'Dashboard'
            }
            <section className="top-section">
                {
                    document && document.document ? 
                            <DocumentTop documentName={document.document.name} handleSaveFromButton={handleSaveFromButton} textEditorData={textEditorData} /> : ''
                }
            </section>
            <section id="bottom-container" className="bottom-section-hidden">
                <div className="editor-container" id="text-editor">
                    {
                        document && document.document && 
                            <TextEditor documentName={document.document.name} data={document.document.data} documentId={documentId} setTextEditorData={setTextEditorData} socket={socket}/>
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
                                {
                                    document && document.document && document.document.edited &&
                                        <DocumentEdited edited={document.document.edited}/>
                                }
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