import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../Css/templateGeneration.css";
import Template1 from '../Components/Template1.jsx';
import Template2 from '../Components/Template2.jsx';
import InputSection from '../Components/InputSection.jsx';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import juice from 'juice';

const TemplateGeneration = ({ setTemplateForEditor }) => {
  const navigate = useNavigate();
  const prompt = useRef(null);
  const [urlForShop, setUrlFromShop] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [result, setResult] = useState({
    description: "the description",
    promo: "PROMOOOO",
    subject: "the main thing",
    image_url: "",
  });

  const setResultToDefault = () => {
    setResult({
      description: "",
      promo: "",
      subject: "",
      image_url: "",
    });
  };

  const handleSendPrompt = () => {
    const data = { query: prompt.current.value };

    console.log('Sending prompt:', data.query);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/query`, {  // Use environment variable for URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then(data => {
      console.log('Received data:', data);
      setResult(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const handleCopyToClipboard = (templateId) => {
    const templateElement = document.getElementById(templateId);
    if (templateElement) {
      const range = document.createRange();
      range.selectNode(templateElement);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      alert("Template copied to clipboard!");
    } else {
      console.error(`Element with ID ${templateId} not found.`);
    }
  };

  const extractHtml = (templateId) => {
    const element = document.getElementById(templateId);
    if (element) {
      const htmlWithInlineStyles = juice(element.outerHTML);
      return htmlWithInlineStyles;
    } else {
      console.error(`Element with ID ${templateId} not found.`);
      return null;
    }
  };

  const sendToEditor = (templateId) => {
    const extractedHtml = extractHtml(templateId);
    if (extractedHtml) {
      console.log('Extracted HTML:', extractedHtml);
      const design = convertHtmlToUnlayerDesign(extractedHtml);
      setTemplateForEditor(design);
      navigate("/template-editor");
    } else {
      console.error(`Extracted HTML is null for ID ${templateId}`);
    }
  };

  const convertHtmlToUnlayerDesign = (html) => {
    // Assuming you have a function that converts HTML to Unlayer design
    // Implement this function according to your needs
    return { html };  // Placeholder implementation
  };

  return (
    <div className="container mt-5">
      <div className="input-section">
        <textarea ref={prompt} placeholder="Enter your prompt here..." className="form-control" rows="4"></textarea>
        <button onClick={handleSendPrompt} className="btn btn-primary mt-3">Generate</button>
      </div>
      {result.subject && (
        <div className="result-section mt-4">
          <h2>{result.subject}</h2>
          <h3>{result.promo}</h3>
          <p>{result.description}</p>
          {result.image_url && <img src={result.image_url} alt="Generated" />}
        </div>
      )}
      <div className="image-upload mt-4">
        <input type="file" onChange={handleFileChange} />
        {uploadedImage && (
          <div>
            <img src={uploadedImage} alt="Uploaded Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
            <button onClick={handleRemoveImage} className="btn btn-danger mt-2">Remove Image</button>
          </div>
        )}
      </div>
      <div className="templates mt-4">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Template
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => sendToEditor('template1')}>Template 1</Dropdown.Item>
            <Dropdown.Item onClick={() => sendToEditor('template2')}>Template 2</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div id="template1">
        <Template1 />
      </div>
      <div id="template2">
        <Template2 />
      </div>
    </div>
  );
};

export default TemplateGeneration;
