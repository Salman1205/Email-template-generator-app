import React from 'react';
import "../Css/templateGeneration.css"; // Ensure the correct CSS file is imported

const InputSection = ({ setUrlFromShop, urlForShop, setResultToDefault, handleSendPrompt, prompt, handleFileChange, handleRemoveImage }) => {
  return (
    <div className="inputContainer">
      <p>Describe the email you'd like to create</p>
      <textarea
        ref={prompt}
        className="promptTextArea"
        placeholder="Enter your prompt here"
      />
      <button className="button" onClick={handleSendPrompt}>Send to Server</button>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="fileInput"
      />
      <button onClick={handleRemoveImage} className="remove-image-button">Remove Image</button>
    </div>
  );
}

export default InputSection;
