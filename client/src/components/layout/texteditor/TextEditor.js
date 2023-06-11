import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { TOOLBAR_OPTIONS } from './ToolbarOptions';
import { DOCUMENT_SAVE_INTERVAL_MS } from '../../../actions/constant';
import { updateDocumentById } from '../../../actions/documents';
import { connect } from 'react-redux';
import  { io } from 'socket.io-client';

const TextEditor = props => {

    const { data, documentId, updateDocumentById, setTextEditorData } = props;
    const [quill, setQuill] = useState();
    const [socket, setSocket] = useState();

    useEffect(() => {
        const socket = io('http://localhost:5000');
        setSocket(socket);
    
        return () => {
            socket.disconnect()
        }
    }, [])

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        
        //Clearing the HTMl of wrapper if it exists already.
        //Done to prevent double rendering of quill
        wrapper.innerHTML = '';
        const editorContainer = document.createElement('div');
        wrapper.append(editorContainer);
        const newQuill = new Quill(editorContainer, 
                    { 
                        theme: 'snow',
                        modules: {
                            toolbar: TOOLBAR_OPTIONS
                        }
                    }
        );

        setQuill(newQuill);
    }, []);

    //This useEffect is to load text data from the database
    useEffect(() => {
        if (quill == null || socket == null) return;
        socket.once('load-document', () => {
            quill.setContents(data);
            setTextEditorData(data);
        });

        socket.emit('get-document', { data, documentId });
    }, [quill, setTextEditorData, data, socket, documentId]);

    //This useEffect is to save data to the database.
    useEffect(() => {
        if (quill == null || socket == null) return;

        const interval = setInterval(() => {
            updateDocumentById(
                documentId, 
                { 
                    data: quill.getContents(),
                    savedUsingButton: false 
                }
            );
            console.log('Updated Document for:', documentId)
            
            
            socket.emit('save-document', { documentId, 
                                            data:quill.getContents()});

        }, DOCUMENT_SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interval);
        }
    }, [quill, documentId, updateDocumentById, socket]);


    //This useEffect is to handle changes in document done by another user
    useEffect(() => {
        if (quill == null || socket == null) return;

        const changeHandler = change => {
            quill.updateContents(change);
        }

        socket.on('receive-changes', changeHandler);

        return () => {
            socket.off('receive-changes', changeHandler)
        }
    }, [quill, socket]);

    //This useEffect is to push update of document by current user
    useEffect(() => {
        if (quill == null || socket == null) return;

        const changeHandler = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit('send-changes', { documentId, delta })
        }

        quill.on('text-change', changeHandler);

        return () => {
            quill.off('text-change', changeHandler)
        }
    }, [quill, socket, documentId]);


    useEffect(() => {
        if (quill == null || socket == null) return;

        socket.on('save-document', documentContents => {
            quill.setContents(documentContents);
        })
    }, [quill, socket])

    //This useEffect is to update textEditorData in DocumentPage.
    //We will use it for 'Save' button.
    // useEffect(() => {
    //     if (quill == null) return;

    //     setTextEditorData(quill.getContents());
    // }, [quill, setTextEditorData])

    const saveDocumentUsingButton = () => {
        updateDocumentById(
            documentId, 
            { 
                data: quill.getContents(),
                savedUsingButton: true 
            });
    }

    return (
        <div id="quill-container">
            <button id="save-document" onClick={saveDocumentUsingButton}>
                Save
            </button>
            <div id="text" ref={wrapperRef}></div>
        </div>
    )
}

TextEditor.propTypes = {
    data: PropTypes.object,
    updateDocumentById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    document: state.document
})

export default connect(mapStateToProps, { updateDocumentById })(TextEditor);