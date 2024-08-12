import React, { useRef, useEffect } from 'react'

import EmailEditor from 'react-email-editor';

const Editor = ({ templateForEditor }) => {

    const emailEditorRef = useRef(null);

    const handleCopyToClipboard = async () => {
        try {
            // Get the full HTML string from exportHtml
            const fullHtml = await exportHtml();
    
            // Parse the HTML string into a DOM object
            const parser = new DOMParser();
            const doc = parser.parseFromString(fullHtml, 'text/html');
    
            // Extract the body content
            const bodyContent = doc.body.innerHTML;
    
            // Check if the Clipboard API is supported
            if (navigator.clipboard && window.ClipboardItem) {
                // Create a new Blob with the body content and the MIME type 'text/html'
                const blob = new Blob([bodyContent], { type: 'text/html' });
    
                // Create a ClipboardItem with the Blob
                const clipboardItem = new ClipboardItem({ 'text/html': blob });
    
                // Write the ClipboardItem to the clipboard
                await navigator.clipboard.write([clipboardItem]);
    
                alert('HTML content copied to clipboard!');
            } else {
                // Fallback for browsers that do not support the Clipboard API
                const textarea = document.createElement('textarea');
                textarea.value = bodyContent;
                document.body.appendChild(textarea);
    
                // Select the text and copy it to the clipboard
                textarea.select();
                document.execCommand('copy');
    
                // Clean up
                document.body.removeChild(textarea);
    
                alert('HTML content copied to clipboard!');
            }
        } catch (error) {
            console.error('Error copying HTML content to clipboard:', error);
            alert('Failed to copy HTML content to clipboard.');
        }
    };

    const exportHtml = () => {
        return new Promise((resolve, reject) => {
            emailEditorRef.current.editor.exportHtml((data) => {
                const { html } = data;
                if (html) {
                    resolve(html); // Resolve the promise with the HTML content
                } else {
                    reject(new Error('Failed to export HTML')); // Reject if there's an error
                }
            });
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
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100vw",
            height: "100vh"
            /* border: 2px solid red; */
        }}>
            <div>
                <button onClick={handleCopyToClipboard}>Copy To Clipboard</button>
                {/* <button onClick={exportJson}>Export Json</button> */}
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