import React, { useRef, useEffect } from 'react';
import EmailEditor from 'react-email-editor';

const Editor = ({ templateForEditor }) => {
  const emailEditorRef = useRef(null);

  useEffect(() => {
    if (emailEditorRef.current && templateForEditor) {
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
        <button onClick={exportJson}>Export Json</button>
      </div>
      <EmailEditor ref={emailEditorRef} />
    </div>
  );
};

export default Editor;
