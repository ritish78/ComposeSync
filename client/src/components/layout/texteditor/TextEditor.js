import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { TOOLBAR_OPTIONS } from './ToolbarOptions';
import { DOCUMENT_SAVE_INTERVAL_MS } from '../../../actions/constant';
import { updateDocumentById } from '../../../actions/documents';
import { connect } from 'react-redux';

const TextEditor = props => {

    const { data, documentId, updateDocumentById } = props;
    const [quill, setQuill] = useState();

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
        if (quill == null) return;
        // quill.setText(data);
        quill.setContents(data);
    }, [quill, data]);

    //This useEffect is to save data to the database.
    useEffect(() => {
        if (quill == null) return;

        const interval = setInterval(() => {
            updateDocumentById(
                    documentId, 
                    { 
                        data: quill.getContents(),
                        savedUsingButton: false 
                    });
            console.log('Updated Document for:', documentId)
        }, DOCUMENT_SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interval);
        }
    }, [quill, documentId, updateDocumentById]);


    //This useEffect is to update textEditorData in DocumentPage.
    //We will use it for 'Save' button.
    // useEffect(() => {
    //     if (quill == null) return;

    //     setData(quill.getContents())
    // }, [quill, setData])

    return (
        <div id="text" ref={wrapperRef}></div>
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