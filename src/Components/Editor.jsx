import React, { useRef, useEffect } from 'react';
import EmailEditor from 'react-email-editor';

const Editor = ({ templateForEditor }) => {
  const emailEditorRef = useRef(null);

  // This function will be called when the editor is loaded
  const onLoad = () => {
    if (emailEditorRef.current && templateForEditor) {
      emailEditorRef.current.editor.loadDesign(templateForEditor);
    }
  };

  useEffect(() => {
    // If the editor is already loaded, we can load the design
    if (emailEditorRef.current && emailEditorRef.current.editor && templateForEditor) {
      emailEditorRef.current.editor.loadDesign(templateForEditor);
    }
  }, [templateForEditor]);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      console.log('exportHtml', html);
    });
  };

  const exportJson = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design } = data;
      console.log('exportJson', design);
    });
  };

  return (
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
        <button onClick={exportJson}>Export JSON</button>
      </div>
      <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
    </div>
  );
};

export default Editor;
