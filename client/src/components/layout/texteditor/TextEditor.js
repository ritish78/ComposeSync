import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { TOOLBAR_OPTIONS } from './ToolbarOptions';

const TextEditor = props => {
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        
        //Clearing the HTMl of wrapper if it exists already.
        //Done to prevent double rendering of quill
        wrapper.innerHTML = '';
        const editorContainer = document.createElement('div');
        wrapper.append(editorContainer);
        new Quill(editorContainer, 
                    { 
                        theme: 'snow',
                        modules: {
                            toolbar: TOOLBAR_OPTIONS
                        }
                    }
        );

    }, []);

    return (
        <div id="text" ref={wrapperRef}></div>
    )
}

TextEditor.propTypes = {}

export default TextEditor