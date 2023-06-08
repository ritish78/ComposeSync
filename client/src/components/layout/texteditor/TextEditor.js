import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { TOOLBAR_OPTIONS } from './ToolbarOptions';

const TextEditor = props => {

    const { data } = props;
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

    useEffect(() => {
        if (quill == null) return;
        quill.setText(data);
        // quill.setContents(data);
    }, [quill, data]);

    return (
        <div id="text" ref={wrapperRef}></div>
    )
}

TextEditor.propTypes = {}

export default TextEditor