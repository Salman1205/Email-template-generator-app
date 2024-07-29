import React, { useRef, useEffect } from 'react'

import EmailEditor from 'react-email-editor';

const Editor = ({ templateForEditor }) => {

    const emailEditorRef = useRef(null);

    const exportHtml = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            console.log('exportHtml', html);
        });
    };

    const exportJson = () => {
        emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            console.log('exportJson', design);
        });
      } 

    const onLoad = () => {
        const design = templateForEditor;
        emailEditorRef.current.editor.loadDesign(design);
    };
    
    const onReady = () => {
        // editor is ready
        console.log('onReady');
    };

    const setTemplateInEditor = () => {
  
        if (emailEditorRef.current) {
        emailEditorRef.current.editor.loadDesign(templateForEditor);
        } else {
        console.error('Email Editor is not initialized');
        }
    };

    return (
        <div>
            <div>
                <button onClick={exportHtml}>Export HTML</button>
                <button onClick={exportJson}>Export Json</button>
            </div>
            
            <EmailEditor
                ref={emailEditorRef}
                onLoad={onLoad}
                onReady={onReady}
            />
        </div>
    )
}

export default Editor
